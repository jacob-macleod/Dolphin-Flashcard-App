// ets_tracing: off

/* eslint-disable prefer-const */
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { _A, _E, _R, _U } from "../Effect/commons.mjs";
import * as E from "../Either/index.mjs";
import { pipe } from "../Function/index.mjs";
import { Stack } from "../Stack/index.mjs";
export class Async {}
/**
 * @ets_optimize identity
 */

function concrete(_) {
  return _;
}

class ISucceed extends Async {
  constructor(a) {
    super();
    this.a = a;
    this._asyncTag = "Succeed";
  }

}

class ISuspend extends Async {
  constructor(f) {
    super();
    this.f = f;
    this._asyncTag = "Suspend";
  }

}

class IFail extends Async {
  constructor(e) {
    super();
    this.e = e;
    this._asyncTag = "Fail";
  }

}

class IFlatMap extends Async {
  constructor(value, cont) {
    super();
    this.value = value;
    this.cont = cont;
    this._asyncTag = "FlatMap";
  }

}

class IFold extends Async {
  constructor(value, failure, success) {
    super();
    this.value = value;
    this.failure = failure;
    this.success = success;
    this._asyncTag = "Fold";
  }

}

class IAccess extends Async {
  constructor(access) {
    super();
    this.access = access;
    this._asyncTag = "Access";
  }

}

class IProvide extends Async {
  constructor(r, cont) {
    super();
    this.r = r;
    this.cont = cont;
    this._asyncTag = "Provide";
  }

}

class IPromise extends Async {
  constructor(promise, onError) {
    super();
    this.promise = promise;
    this.onError = onError;
    this._asyncTag = "Promise";
  }

}

class IDone extends Async {
  constructor(exit) {
    super();
    this.exit = exit;
    this._asyncTag = "Done";
  }

}

class FoldFrame {
  constructor(failure, apply) {
    this.failure = failure;
    this.apply = apply;
    this._asyncTag = "FoldFrame";
  }

}

class ApplyFrame {
  constructor(apply) {
    this.apply = apply;
    this._asyncTag = "ApplyFrame";
  }

}
/**
 * Models the state of interruption, allows for listening to interruption events & firing interruption events
 */


export class InterruptionState {
  constructor() {
    this.isInterrupted = false;
    this.listeners = new Set();
  } // listen to an interruption event


  listen(f) {
    this.listeners.add(f);
    return () => {
      // stop listening
      this.listeners.delete(f);
    };
  }

  get interrupted() {
    return this.isInterrupted;
  }

  interrupt() {
    if (!this.isInterrupted) {
      // set to interrupted
      this.isInterrupted = true; // notify

      this.listeners.forEach(i => {
        i();
      });
    }
  }

}
export const failExit = e => ({
  _tag: "Failure",
  e
});
export const interruptExit = {
  _tag: "Interrupt"
};
export const successExit = a => ({
  _tag: "Success",
  a
});
/**
 * Models a cancellable promise
 */

class CancelablePromise {
  constructor( // creates the promise
  promiseFactory, // listens for interruption events
  is) {
    this.promiseFactory = promiseFactory;
    this.is = is; // gets called with a Rejection<E>, any here is to not break covariance imposed by _E

    this.rejection = undefined; // holds the current running promise

    this.current = undefined; // creates the computation linking it to the interruption state

    this.promise = () => {
      if (this.current) {
        throw new Error("Bug: promise() have been called twice");
      } else if (this.is.interrupted) {
        throw new Error("Bug: trying to create a promise already interrupted");
      } else {
        const onInterrupt = []; // we record the current interrupt in the interruption registry

        const removeListener = this.is.listen(() => {
          onInterrupt.forEach(f => {
            f();
          });
          this.interrupt();
        });
        const p = new Promise((res, rej) => {
          // set the rejection handler
          this.rejection = rej; // creates the underlying promise

          this.promiseFactory(f => {
            onInterrupt.push(f);
          }).then(a => {
            // removes the call to interrupt from the interruption registry
            removeListener(); // if not interrupted we continue

            if (!this.is.interrupted) {
              res(a);
            }
          }).catch(e => {
            // removes the call to interrupt from the interruption registry
            removeListener(); // if not interrupted we continue

            if (!this.is.interrupted) {
              rej(e);
            }
          });
        }); // track the current running promise to avoid re-creation

        this.current = p; // return the promise

        return p;
      }
    };

    this.interrupt = () => {
      var _a; // triggeres a promise rejection on the current promise with an interrupt exit


      (_a = this.rejection) === null || _a === void 0 ? void 0 : _a.call(this, interruptExit);
    };
  }

}

export class Tracer {
  constructor() {
    this.running = new Set();
    this.traced = this.traced.bind(this);
    this.wait = this.wait.bind(this);
    this.clear = this.clear.bind(this);
  } // tracks a lazy promise lifetime


  traced(promise) {
    return async () => {
      const p = promise();
      this.running.add(p);

      try {
        const a = await p;
        this.running.delete(p);
        return Promise.resolve(a);
      } catch (e) {
        this.running.delete(p);
        return Promise.reject(e);
      }
    };
  } // awaits for all the running promises to complete


  async wait() {
    const t = await Promise.all(Array.from(this.running).map(p => p.then(a => successExit(a)).catch(e => Promise.resolve(e))));
    return await new Promise(r => {
      setTimeout(() => {
        r(t);
      }, 0);
    });
  } // clears itself


  clear() {
    this.running.clear();
  }

} // create the root tracing context

export const tracingContext = /*#__PURE__*/new Tracer();
/**
 * Runs this computation with the specified initial state, returning either a
 * failure or the updated state and the result
 */

export function runPromiseExitEnv(self, ri, is = new InterruptionState()) {
  return tracingContext.traced(async () => {
    let stack = undefined;
    let a = null;
    let r = ri;
    let failed = false;
    let curAsync = self;
    let cnt = 0;
    let interruptedLocal = false;

    function isInterruted() {
      return interruptedLocal || is.interrupted;
    }

    function pop() {
      const nextInstr = stack;

      if (nextInstr) {
        stack = stack === null || stack === void 0 ? void 0 : stack.previous;
      }

      return nextInstr === null || nextInstr === void 0 ? void 0 : nextInstr.value;
    }

    function push(cont) {
      stack = new Stack(cont, stack);
    }

    function findNextErrorHandler() {
      let unwinding = true;

      while (unwinding) {
        const nextInstr = pop();

        if (nextInstr == null) {
          unwinding = false;
        } else {
          if (nextInstr._asyncTag === "FoldFrame") {
            unwinding = false;
            push(new ApplyFrame(nextInstr.failure));
          }
        }
      }
    }

    while (curAsync != null && !isInterruted()) {
      if (cnt > 10000) {
        await new Promise(r => {
          setTimeout(() => {
            r(undefined);
          }, 0);
        });
        cnt = 0;
      }

      cnt += 1;
      const xp = curAsync;

      switch (xp._asyncTag) {
        case "FlatMap":
          {
            const nested = xp.value;
            const continuation = xp.cont;

            switch (nested._asyncTag) {
              case "Succeed":
                {
                  curAsync = continuation(nested.a);
                  break;
                }

              default:
                {
                  curAsync = nested;
                  push(new ApplyFrame(continuation));
                }
            }

            break;
          }

        case "Suspend":
          {
            curAsync = xp.f();
            break;
          }

        case "Succeed":
          {
            a = xp.a;
            const nextInstr = pop();

            if (nextInstr) {
              curAsync = nextInstr.apply(a);
            } else {
              curAsync = undefined;
            }

            break;
          }

        case "Fail":
          {
            findNextErrorHandler();
            const nextInst = pop();

            if (nextInst) {
              curAsync = nextInst.apply(xp.e);
            } else {
              failed = true;
              a = xp.e;
              curAsync = undefined;
            }

            break;
          }

        case "Fold":
          {
            curAsync = xp.value;
            push(new FoldFrame(xp.failure, xp.success));
            break;
          }

        case "Done":
          {
            switch (xp.exit._tag) {
              case "Failure":
                {
                  curAsync = new IFail(xp.exit.e);
                  break;
                }

              case "Interrupt":
                {
                  interruptedLocal = true;
                  curAsync = undefined;
                  break;
                }

              case "Success":
                {
                  curAsync = new ISucceed(xp.exit.a);
                  break;
                }
            }

            break;
          }

        case "Access":
          {
            curAsync = xp.access(r);
            break;
          }

        case "Provide":
          {
            r = xp.r;
            curAsync = xp.cont;
            break;
          }

        case "Promise":
          {
            try {
              curAsync = new ISucceed(await new CancelablePromise(s => xp.promise(s).catch(e => Promise.reject(failExit(xp.onError(e)))), is).promise());
            } catch (e) {
              const e_ = e;

              switch (e_._tag) {
                case "Failure":
                  {
                    curAsync = new IFail(e_.e);
                    break;
                  }

                case "Interrupt":
                  {
                    interruptedLocal = true;
                    curAsync = undefined;
                    break;
                  }
              }
            }

            break;
          }
      }
    }

    if (is.interrupted) {
      return interruptExit;
    }

    if (failed) {
      return failExit(a);
    }

    return successExit(a);
  })();
}
export function runPromiseExit(self, is = new InterruptionState()) {
  return runPromiseExitEnv(self, {}, is);
} // runs as a Promise of an Exit

export async function runPromise(task, is = new InterruptionState()) {
  return runPromiseExit(task, is).then(e => e._tag === "Failure" ? Promise.reject(e.e) : e._tag === "Interrupt" ? Promise.reject(e) : Promise.resolve(e.a));
} // runs as a Cancellable

export function runAsync(task, cb) {
  const is = new InterruptionState();
  runPromiseExit(task, is).then(cb);
  return () => {
    is.interrupt();
  };
} // runs as a Cancellable

export function runAsyncEnv(task, r, cb) {
  const is = new InterruptionState();
  runPromiseExitEnv(task, r, is).then(cb);
  return () => {
    is.interrupt();
  };
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => new IFlatMap(self, f);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export function chain_(self, f) {
  return new IFlatMap(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */

export function tap(f) {
  return self => tap_(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */

export function tap_(self, f) {
  return chain_(self, a => map_(f(a), () => a));
}
/**
 * Constructs a computation that always succeeds with the specified value.
 */

export function succeed(a) {
  return new ISucceed(a);
}
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */

export function fail(a) {
  return new IFail(a);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export function map_(self, f) {
  return chain_(self, a => succeed(f(a)));
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */

export function foldM_(self, failure, success) {
  return new IFold(self, failure, success);
}
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 *
 * @ets_data_first foldM_
 */

export function foldM(failure, success) {
  return self => foldM_(self, failure, success);
}
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or right function passed to `fold`.
 *
 * @ets_data_first fold_
 */

export function fold(failure, success) {
  return self => fold_(self, failure, success);
}
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */

export function fold_(self, failure, success) {
  return foldM_(self, e => succeed(failure(e)), a => succeed(success(a)));
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */

export function catchAll(failure) {
  return self => catchAll_(self, failure);
}
/**
 * Recovers from all errors.
 */

export function catchAll_(self, failure) {
  return foldM_(self, failure, a => succeed(a));
}
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */

export function bimap(f, g) {
  return self => bimap_(self, f, g);
}
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */

export function bimap_(self, f, g) {
  return foldM_(self, e => fail(f(e)), a => succeed(() => g(a)));
}
/**
 * Transforms the error type of this computation with the specified
 * function.
 *
 * @ets_data_first mapError_
 */

export function mapError(f) {
  return self => mapError_(self, f);
}
/**
 * Transforms the error type of this computation with the specified
 * function.
 */

export function mapError_(self, f) {
  return catchAll_(self, e => fail(f(e)));
}
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */

export const unit = /*#__PURE__*/succeed(undefined);
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */

export function provideSome(f) {
  return self => accessM(r => provideAll(f(r))(self));
}
/**
 * Provides this computation with its required environment.
 *
 * @ets_data_first provideAll_
 */

export function provideAll(r) {
  return self => new IProvide(r, self);
}
/**
 * Provides this computation with its required environment.
 */

export function provideAll_(self, r) {
  return new IProvide(r, self);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */

export function provide(r) {
  return next => provideSome(r0 => ({ ...r0,
    ...r
  }))(next);
}
/**
 * Access the environment monadically
 */

export function accessM(f) {
  return new IAccess(f);
}
/**
 * Access the environment with the function f
 */

export function access(f) {
  return accessM(r => succeed(f(r)));
}
/**
 * Access the environment
 */

export function environment() {
  return accessM(r => succeed(r));
}
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */

export function either(self) {
  return fold_(self, E.left, E.right);
}
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */

export function orElseEither(that) {
  return self => orElseEither_(self, that);
}
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */

export function orElseEither_(self, that) {
  return foldM_(self, () => map_(that(), a => E.right(a)), a => succeed(E.left(a)));
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */

export function zipWith_(self, that, f) {
  return chain_(self, a => map_(that, b => f(a, b)));
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */

export function zip(that) {
  return self => zip_(self, that);
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */

export function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Suspend a computation, useful in recursion
 */

export function suspend(f) {
  return new ISuspend(f);
}
/**
 * Lift a sync (non failable) computation
 */

export function succeedWith(f) {
  return suspend(() => succeed(f()));
}
/**
 * Lift a sync (non failable) computation
 */

export function tryCatch(f, onThrow) {
  return suspend(() => {
    try {
      return succeed(f());
    } catch (u) {
      return fail(onThrow(u));
    }
  });
} // construct from a promise

export function promise(promise, onError) {
  return new IPromise(promise, onError);
} // construct from a non failable promise

export function unfailable(promise) {
  return new IPromise(promise, () => undefined);
} // construct a Task from an exit value

export function done(exit) {
  return new IDone(exit);
} // like .then in Promise when the result of f is a Promise but ignores the outout of f
// useful for logging or doing things that should not change the result

export function tapError(f) {
  return self => catchAll(e => chain(_ => fail(e))(f(e)))(self);
} // sleeps for ms milliseconds

export function sleep(ms) {
  return unfailable(onInterrupt => new Promise(res => {
    const timer = setTimeout(() => {
      res(undefined);
    }, ms);
    onInterrupt(() => {
      clearTimeout(timer);
    });
  }));
} // delay the computation prepending a sleep of ms milliseconds

export function delay(ms) {
  return self => chain(() => self)(sleep(ms));
} // list an Either

export function fromEither(e) {
  return e._tag === "Right" ? succeed(e.right) : fail(e.left);
}
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */

export function unionFn(_) {
  return _;
}
/**
 * Compact the union
 *
 * @ets_optimize identity
 */

export function union(_) {
  return _;
}
/**
 * Get the A from an option
 */

export default function tryCatchOption_(ma, onNone) {
  return fromEither(E.fromOption_(ma, onNone));
}
/**
 * Get the A from an option
 *
 * @ets_data_first tryCatchOption_
 */

export function tryCatchOption(onNone) {
  return ma => tryCatchOption_(ma, onNone);
}
//# sourceMappingURL=core.mjs.map