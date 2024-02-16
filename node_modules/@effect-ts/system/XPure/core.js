"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.XPureBase = void 0;
exports.access = access;
exports.accessM = accessM;
exports.bimap = bimap;
exports.bimap_ = bimap_;
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;
exports.chain = chain;
exports.chain_ = chain_;
exports.contramapInput = contramapInput;
exports.either = either;
exports.environment = environment;
exports.fail = fail;
exports.fold = fold;
exports.foldM = foldM;
exports.foldM_ = foldM_;
exports.fold_ = fold_;
exports.get = get;
exports.getM = getM;
exports.log = log;
exports.logWith = logWith;
exports.map = map;
exports.mapError = mapError;
exports.mapError_ = mapError_;
exports.map_ = map_;
exports.modify = modify;
exports.orElseEither = orElseEither;
exports.orElseEither_ = orElseEither_;
exports.provide = provide;
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
exports.provideSome = provideSome;
exports.run = run;
exports.runAll = runAll;
exports.runAll_ = runAll_;
exports.runEither = runEither;
exports.runLog = runLog;
exports.runResult = runResult;
exports.runResult_ = runResult_;
exports.runState = runState;
exports.runState_ = runState_;
exports.set = set;
exports.succeed = succeed;
exports.succeedWith = succeedWith;
exports.suspend = suspend;
exports.tap = tap;
exports.tap_ = tap_;
exports.tryCatch = tryCatch;
exports.unit = void 0;
exports.update = update;
exports.zip = zip;
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;
exports.zip_ = zip_;

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Chunk/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _commons = /*#__PURE__*/require("../Effect/commons.js");

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/core.js"));

var _index2 = /*#__PURE__*/require("../Stack/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* eslint-disable prefer-const */
class XPureBase {
  constructor() {
    this._tag = "XPure";
  }

}
/**
 * @ets_optimize remove
 */


exports.XPureBase = XPureBase;

function concrete(_) {//
}

class Succeed extends XPureBase {
  constructor(a) {
    super();
    this.a = a;
    this._xptag = "Succeed";
  }

}

class Log extends XPureBase {
  constructor(w) {
    super();
    this.w = w;
    this._xptag = "Log";
  }

}

class Suspend extends XPureBase {
  constructor(f) {
    super();
    this.f = f;
    this._xptag = "Suspend";
  }

}

class Fail extends XPureBase {
  constructor(e) {
    super();
    this.e = e;
    this._xptag = "Fail";
  }

}

class Modify extends XPureBase {
  constructor(run) {
    super();
    this.run = run;
    this._xptag = "Modify";
  }

}

class FlatMap extends XPureBase {
  constructor(value, cont) {
    super();
    this.value = value;
    this.cont = cont;
    this._xptag = "FlatMap";
  }

}

class Fold extends XPureBase {
  constructor(value, failure, success) {
    super();
    this.value = value;
    this.failure = failure;
    this.success = success;
    this._xptag = "Fold";
  }

}

class Get extends XPureBase {
  constructor(get) {
    super();
    this.get = get;
    this._xptag = "Get";
  }

}

class Access extends XPureBase {
  constructor(access) {
    super();
    this.access = access;
    this._xptag = "Access";
  }

}

class Provide extends XPureBase {
  constructor(r, cont) {
    super();
    this.r = r;
    this.cont = cont;
    this._xptag = "Provide";
  }

}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


function chain(f) {
  return self => new FlatMap(self, f);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */


function chain_(self, f) {
  return new FlatMap(self, f);
}
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
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
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */


function succeed(a) {
  return new Succeed(a);
}
/**
 * Constructs a computation that logs w.
 */


function log(w) {
  return new Log(w);
}
/**
 * Constructs a computation that logs w.
 */


function logWith(f) {
  return suspend(() => log(f()));
}
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */


function fail(a) {
  return new Fail(a);
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
 */


function map(f) {
  return self => chain_(self, a => succeed(f(a)));
}
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */


function foldM_(self, failure, success) {
  return new Fold(self, failure, success);
}
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */


function foldM(failure, success) {
  return self => foldM_(self, failure, success);
}
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
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
 */


function bimap(f, g) {
  return self => bimap_(self, f, g);
}
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */


function bimap_(self, f, g) {
  return foldM_(self, e => fail(f(e)), a => succeed(g(a)));
}
/**
 * Transforms the error type of this computation with the specified
 * function.
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
 * Constructs a computation from the specified modify function.
 */


function modify(f) {
  return new Modify(f);
}
/**
 * Constructs a computation from the specified modify function.
 */


function set(s) {
  return modify(() => Tp.tuple(s, undefined));
}
/**
 * Constructs a computation from the specified update function.
 */


function update(f) {
  return modify(s => Tp.tuple(f(s), undefined));
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

function contramapInput(f) {
  return self => chain_(update(f), () => self);
}
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */


function provideSome(f) {
  return self => accessM(r => provideAll(f(r))(self));
}
/**
 * Provides this computation with its required environment.
 */


function provideAll(r) {
  return self => new Provide(r, self);
}
/**
 * Provides this computation with its required environment.
 */


function provideAll_(self, r) {
  return new Provide(r, self);
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
 * Get the state monadically
 */


function getM(f) {
  return new Get(f);
}
/**
 * Get the state with the function f
 */


function get(f) {
  return getM(s => succeed(f(s)));
}
/**
 * Access the environment monadically
 */


function accessM(f) {
  return new Access(f);
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
  return new Suspend(f);
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


function tryCatch(onThrow) {
  return f => suspend(() => {
    try {
      return succeed(f());
    } catch (u) {
      return fail(onThrow(u));
    }
  });
}

class FoldFrame {
  constructor(failure, apply) {
    this.failure = failure;
    this.apply = apply;
    this._xptag = "FoldFrame";
  }

}

class ApplyFrame {
  constructor(apply) {
    this.apply = apply;
    this._xptag = "ApplyFrame";
  }

}

class Runtime {
  constructor() {
    this.stack = undefined;
  }

  pop() {
    var _a;

    const nextInstr = this.stack;

    if (nextInstr) {
      this.stack = (_a = this.stack) === null || _a === void 0 ? void 0 : _a.previous;
    }

    return nextInstr === null || nextInstr === void 0 ? void 0 : nextInstr.value;
  }

  push(cont) {
    this.stack = new _index2.Stack(cont, this.stack);
  }

  findNextErrorHandler() {
    let unwinding = true;

    while (unwinding) {
      const nextInstr = this.pop();

      if (nextInstr == null) {
        unwinding = false;
      } else {
        if (nextInstr._xptag === "FoldFrame") {
          unwinding = false;
          this.push(new ApplyFrame(nextInstr.failure));
        }
      }
    }
  }

  runAll(self, s) {
    let s0 = s;
    let a = undefined;
    let environments = undefined;
    let failed = false;
    let curXPure = self;
    let logs = Chunk.empty();

    while (curXPure != null) {
      ;
      const xp = curXPure;

      switch (xp._xptag) {
        case "FlatMap":
          {
            ;
            const nested = xp.value;
            const continuation = xp.cont;

            switch (nested._xptag) {
              case "Succeed":
                {
                  curXPure = continuation(nested.a);
                  break;
                }

              case "Modify":
                {
                  const updated = nested.run(s0);
                  s0 = updated.get(0);
                  a = updated.get(1);
                  curXPure = continuation(a);
                  break;
                }

              default:
                {
                  curXPure = nested;
                  this.push(new ApplyFrame(continuation));
                }
            }

            break;
          }

        case "Log":
          {
            logs = Chunk.append_(logs, xp.w);
            a = undefined;
            const nextInstr = this.pop();
            curXPure = nextInstr === null || nextInstr === void 0 ? void 0 : nextInstr.apply(a);
            break;
          }

        case "Suspend":
          {
            curXPure = xp.f();
            break;
          }

        case "Succeed":
          {
            a = xp.a;
            const nextInstr = this.pop();

            if (nextInstr) {
              curXPure = nextInstr.apply(a);
            } else {
              curXPure = undefined;
            }

            break;
          }

        case "Fail":
          {
            this.findNextErrorHandler();
            const nextInst = this.pop();

            if (nextInst) {
              curXPure = nextInst.apply(xp.e);
            } else {
              failed = true;
              a = xp.e;
              curXPure = undefined;
            }

            break;
          }

        case "Fold":
          {
            const state = s0;
            this.push(new FoldFrame(c => chain_(set(state), () => xp.failure(c)), xp.success));
            curXPure = xp.value;
            break;
          }

        case "Access":
          {
            curXPure = xp.access((environments === null || environments === void 0 ? void 0 : environments.value) || {});
            break;
          }

        case "Get":
          {
            curXPure = xp.get(s0);
            break;
          }

        case "Provide":
          {
            environments = new _index2.Stack(xp.r, environments);
            curXPure = foldM_(xp.cont, e => chain_(succeedWith(() => {
              environments = environments === null || environments === void 0 ? void 0 : environments.previous;
            }), () => fail(e)), a => chain_(succeedWith(() => {
              environments = environments === null || environments === void 0 ? void 0 : environments.previous;
            }), () => succeed(a)));
            break;
          }

        case "Modify":
          {
            const updated = xp.run(s0);
            s0 = updated.get(0);
            a = updated.get(1);
            const nextInst = this.pop();

            if (nextInst) {
              curXPure = nextInst.apply(a);
            } else {
              curXPure = undefined;
            }

            break;
          }
      }
    }

    if (failed) {
      return Tp.tuple(logs, E.left(a));
    }

    return Tp.tuple(logs, E.right(Tp.tuple(s0, a)));
  }

}
/**
 * Runs this computation with the specified initial state, returning both the
 * log and either all the failures that occurred or the updated state and the
 * result.
 */


function runAll_(self, s) {
  return new Runtime().runAll(self, s);
}
/**
 * Runs this computation with the specified initial state, returning either a
 * failure or the updated state and the result
 */


function runAll(s) {
  return self => runAll_(self, s);
}
/**
 * Runs this computation to produce its result.
 */


function run(self) {
  return runState_(self, undefined).get(1);
}
/**
 * Runs this computation with the specified initial state, returning both
 * the updated state and the result.
 */


function runState_(self, s) {
  const result = new Runtime().runAll(self, s).get(1);

  if (result._tag === "Left") {
    throw result.left;
  }

  return result.right;
}
/**
 * Runs this computation with the specified initial state, returning both
 * the updated state and the result.
 *
 * @ets_data_first runState_
 */


function runState(s) {
  return self => runState_(self, s);
}
/**
 * Runs this computation to produce its result or the first failure to
 * occur.
 */


function runEither(self) {
  return E.map_(new Runtime().runAll(self, undefined).get(1), x => x.get(1));
}
/**
 * Runs this computation to produce its result and the log.
 */


function runLog(self) {
  const result = new Runtime().runAll(self, undefined);
  const e = result.get(1);

  if (e._tag === "Left") {
    throw e.left;
  }

  return Tp.tuple(result.get(0), e.right.get(1));
}
/**
 * Runs this computation with the specified initial state, returning the
 * result and discarding the updated state.
 */


function runResult_(self, s) {
  return runState_(self, s)[1];
}
/**
 * Runs this computation with the specified initial state, returning the
 * result and discarding the updated state.
 */


function runResult(s) {
  return self => runResult_(self, s);
}
//# sourceMappingURL=core.js.map