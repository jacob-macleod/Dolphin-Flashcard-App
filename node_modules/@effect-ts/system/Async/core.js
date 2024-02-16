"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tracer = exports.InterruptionState = exports.Async = void 0;
exports.access = access;
exports.accessM = accessM;
exports.bimap = bimap;
exports.bimap_ = bimap_;
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;
exports.chain = chain;
exports.chain_ = chain_;
exports.default = tryCatchOption_;
exports.delay = delay;
exports.done = done;
exports.either = either;
exports.environment = environment;
exports.fail = fail;
exports.failExit = void 0;
exports.fold = fold;
exports.foldM = foldM;
exports.foldM_ = foldM_;
exports.fold_ = fold_;
exports.fromEither = fromEither;
exports.interruptExit = void 0;
exports.map = map;
exports.mapError = mapError;
exports.mapError_ = mapError_;
exports.map_ = map_;
exports.orElseEither = orElseEither;
exports.orElseEither_ = orElseEither_;
exports.promise = promise;
exports.provide = provide;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
exports.provideSome = provideSome;
exports.runAsync = runAsync;
exports.runAsyncEnv = runAsyncEnv;
exports.runPromise = runPromise;
exports.runPromiseExit = runPromiseExit;
exports.runPromiseExitEnv = runPromiseExitEnv;
exports.sleep = sleep;
exports.succeed = succeed;
exports.succeedWith = succeedWith;
exports.successExit = void 0;
exports.suspend = suspend;
exports.tap = tap;
exports.tapError = tapError;
exports.tap_ = tap_;
exports.tracingContext = void 0;
exports.tryCatch = tryCatch;
exports.tryCatchOption = tryCatchOption;
exports.unfailable = unfailable;
exports.union = union;
exports.unionFn = unionFn;
exports.unit = void 0;
exports.zip = zip;
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _commons = /*#__PURE__*/require("../Effect/commons.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var _index3 = /*#__PURE__*/require("../Function/index.js");

var _index4 = /*#__PURE__*/require("../Stack/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* eslint-disable prefer-const */
class Async {}
/**
 * @ets_optimize identity
 */


exports.Async = Async;

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


class InterruptionState {
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

exports.InterruptionState = InterruptionState;

const failExit = e => ({
  _tag: "Failure",
  e
});

exports.failExit = failExit;
const interruptExit = {
  _tag: "Interrupt"
};
exports.interruptExit = interruptExit;

const successExit = a => ({
  _tag: "Success",
  a
});
/**
 * Models a cancellable promise
 */


exports.successExit = successExit;

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

class Tracer {
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


exports.Tracer = Tracer;
const tracingContext = /*#__PURE__*/new Tracer();
/**
 * Runs this computation with the specified initial state, returning either a
 * failure or the updated state and the result
 */

exports.tracingContext = tracingContext;

function runPromiseExitEnv(self, ri, is = new InterruptionState()) {
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
      stack = new _index4.Stack(cont, stack);
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

function runPromiseExit(self, is = new InterruptionState()) {
  return runPromiseExitEnv(self, {}, is);
} // runs as a Promise of an Exit


async function runPromise(task, is = new InterruptionState()) {
  return runPromiseExit(task, is).then(e => e._tag === "Failure" ? Promise.reject(e.e) : e._tag === "Interrupt" ? Promise.reject(e) : Promise.resolve(e.a));
} // runs as a Cancellable


function runAsync(task, cb) {
  const is = new InterruptionState();
  runPromiseExit(task, is).then(cb);
  return () => {
    is.interrupt();
  };
} // runs as a Cancellable


function runAsyncEnv(task, r, cb) {
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


function chain(f) {
  return self => new IFlatMap(self, f);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


function chain_(self, f) {
  return new IFlatMap(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */


function tap(f) {
  return self => tap_(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */


function tap_(self, f) {
  return chain_(self, a => map_(f(a), () => a));
}
/**
 * Constructs a computation that always succeeds with the specified value.
 */


function succeed(a) {
  return new ISucceed(a);
}
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */


function fail(a) {
  return new IFail(a);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


function map_(self, f) {
  return chain_(self, a => succeed(f(a)));
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */


function foldM_(self, failure, success) {
  return new IFold(self, failure, success);
}
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 *
 * @ets_data_first foldM_
 */


function foldM(failure, success) {
  return self => foldM_(self, failure, success);
}
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or right function passed to `fold`.
 *
 * @ets_data_first fold_
 */


function fold(failure, success) {
  return self => fold_(self, failure, success);
}
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */


function fold_(self, failure, success) {
  return foldM_(self, e => succeed(failure(e)), a => succeed(success(a)));
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */


function catchAll(failure) {
  return self => catchAll_(self, failure);
}
/**
 * Recovers from all errors.
 */


function catchAll_(self, failure) {
  return foldM_(self, failure, a => succeed(a));
}
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */


function bimap(f, g) {
  return self => bimap_(self, f, g);
}
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */


function bimap_(self, f, g) {
  return foldM_(self, e => fail(f(e)), a => succeed(() => g(a)));
}
/**
 * Transforms the error type of this computation with the specified
 * function.
 *
 * @ets_data_first mapError_
 */


function mapError(f) {
  return self => mapError_(self, f);
}
/**
 * Transforms the error type of this computation with the specified
 * function.
 */


function mapError_(self, f) {
  return catchAll_(self, e => fail(f(e)));
}
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */


const unit = /*#__PURE__*/succeed(undefined);
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */

exports.unit = unit;

function provideSome(f) {
  return self => accessM(r => provideAll(f(r))(self));
}
/**
 * Provides this computation with its required environment.
 *
 * @ets_data_first provideAll_
 */


function provideAll(r) {
  return self => new IProvide(r, self);
}
/**
 * Provides this computation with its required environment.
 */


function provideAll_(self, r) {
  return new IProvide(r, self);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */


function provide(r) {
  return next => provideSome(r0 => ({ ...r0,
    ...r
  }))(next);
}
/**
 * Access the environment monadically
 */


function accessM(f) {
  return new IAccess(f);
}
/**
 * Access the environment with the function f
 */


function access(f) {
  return accessM(r => succeed(f(r)));
}
/**
 * Access the environment
 */


function environment() {
  return accessM(r => succeed(r));
}
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */


function either(self) {
  return fold_(self, E.left, E.right);
}
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */


function orElseEither(that) {
  return self => orElseEither_(self, that);
}
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */


function orElseEither_(self, that) {
  return foldM_(self, () => map_(that(), a => E.right(a)), a => succeed(E.left(a)));
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */


function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */


function zipWith_(self, that, f) {
  return chain_(self, a => map_(that, b => f(a, b)));
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */


function zip(that) {
  return self => zip_(self, that);
}
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */


function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Suspend a computation, useful in recursion
 */


function suspend(f) {
  return new ISuspend(f);
}
/**
 * Lift a sync (non failable) computation
 */


function succeedWith(f) {
  return suspend(() => succeed(f()));
}
/**
 * Lift a sync (non failable) computation
 */


function tryCatch(f, onThrow) {
  return suspend(() => {
    try {
      return succeed(f());
    } catch (u) {
      return fail(onThrow(u));
    }
  });
} // construct from a promise


function promise(promise, onError) {
  return new IPromise(promise, onError);
} // construct from a non failable promise


function unfailable(promise) {
  return new IPromise(promise, () => undefined);
} // construct a Task from an exit value


function done(exit) {
  return new IDone(exit);
} // like .then in Promise when the result of f is a Promise but ignores the outout of f
// useful for logging or doing things that should not change the result


function tapError(f) {
  return self => catchAll(e => chain(_ => fail(e))(f(e)))(self);
} // sleeps for ms milliseconds


function sleep(ms) {
  return unfailable(onInterrupt => new Promise(res => {
    const timer = setTimeout(() => {
      res(undefined);
    }, ms);
    onInterrupt(() => {
      clearTimeout(timer);
    });
  }));
} // delay the computation prepending a sleep of ms milliseconds


function delay(ms) {
  return self => chain(() => self)(sleep(ms));
} // list an Either


function fromEither(e) {
  return e._tag === "Right" ? succeed(e.right) : fail(e.left);
}
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */


function unionFn(_) {
  return _;
}
/**
 * Compact the union
 *
 * @ets_optimize identity
 */


function union(_) {
  return _;
}
/**
 * Get the A from an option
 */


function tryCatchOption_(ma, onNone) {
  return fromEither(E.fromOption_(ma, onNone));
}
/**
 * Get the A from an option
 *
 * @ets_data_first tryCatchOption_
 */


function tryCatchOption(onNone) {
  return ma => tryCatchOption_(ma, onNone);
}
//# sourceMappingURL=core.js.map