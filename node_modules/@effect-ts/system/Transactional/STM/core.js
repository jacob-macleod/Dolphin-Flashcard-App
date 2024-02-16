"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MaxFrames = void 0;
Object.defineProperty(exports, "STM", {
  enumerable: true,
  get: function () {
    return P.STM;
  }
});
Object.defineProperty(exports, "STMEffect", {
  enumerable: true,
  get: function () {
    return P.STMEffect;
  }
});
Object.defineProperty(exports, "STMFailException", {
  enumerable: true,
  get: function () {
    return P.STMFailException;
  }
});
Object.defineProperty(exports, "STMRetryException", {
  enumerable: true,
  get: function () {
    return P.STMRetryException;
  }
});
exports.absolve = absolve;
exports.access = access;
exports.accessM = accessM;
exports.andThen = andThen;
exports.andThen_ = andThen_;
exports.as = as;
exports.asSome = asSome;
exports.asSomeError = asSomeError;
exports.as_ = as_;
exports.bimap = bimap;
exports.bimap_ = bimap_;
exports.catch = _catch;
Object.defineProperty(exports, "catchAll", {
  enumerable: true,
  get: function () {
    return P.catchAll;
  }
});
Object.defineProperty(exports, "catchAll_", {
  enumerable: true,
  get: function () {
    return P.catchAll_;
  }
});
exports.catchSome = catchSome;
exports.catchSome_ = catchSome_;
exports.catchTag = catchTag;
exports.catchTag_ = catchTag_;
exports.catch_ = catch_;
Object.defineProperty(exports, "chain", {
  enumerable: true,
  get: function () {
    return P.chain;
  }
});
exports.chainError = chainError;
exports.chainError_ = chainError_;
Object.defineProperty(exports, "chain_", {
  enumerable: true,
  get: function () {
    return P.chain_;
  }
});
exports.check = check;
exports.checkWith = checkWith;
exports.commit = commit;
exports.commitEither = commitEither;
exports.compose = compose;
exports.compose_ = compose_;
exports.continueOrFail = continueOrFail;
exports.continueOrFailM = continueOrFailM;
exports.continueOrFailM_ = continueOrFailM_;
exports.continueOrFailWith = continueOrFailWith;
exports.continueOrFailWithM = continueOrFailWithM;
exports.continueOrFailWithM_ = continueOrFailWithM_;
exports.continueOrFailWith_ = continueOrFailWith_;
exports.continueOrFail_ = continueOrFail_;
exports.continueOrRetry = continueOrRetry;
exports.continueOrRetryM = continueOrRetryM;
exports.continueOrRetryM_ = continueOrRetryM_;
exports.continueOrRetry_ = continueOrRetry_;
Object.defineProperty(exports, "die", {
  enumerable: true,
  get: function () {
    return P.die;
  }
});
exports.dieMessage = dieMessage;
exports.dieMessageWith = dieMessageWith;
Object.defineProperty(exports, "dieWith", {
  enumerable: true,
  get: function () {
    return P.dieWith;
  }
});
exports.either = either;
Object.defineProperty(exports, "ensuring", {
  enumerable: true,
  get: function () {
    return P.ensuring;
  }
});
Object.defineProperty(exports, "ensuring_", {
  enumerable: true,
  get: function () {
    return P.ensuring_;
  }
});
exports.environment = environment;
exports.eventually = eventually;
Object.defineProperty(exports, "fail", {
  enumerable: true,
  get: function () {
    return P.fail;
  }
});
Object.defineProperty(exports, "failWith", {
  enumerable: true,
  get: function () {
    return P.failWith;
  }
});
exports.filterOrDie = filterOrDie;
exports.filterOrDieMessage = filterOrDieMessage;
exports.filterOrDieMessage_ = filterOrDieMessage_;
exports.filterOrDie_ = filterOrDie_;
exports.filterOrElse = filterOrElse;
exports.filterOrElse_ = filterOrElse_;
exports.filterOrFail = filterOrFail;
exports.filterOrFail_ = filterOrFail_;
exports.flatten = flatten;
exports.flattenErrorOption = flattenErrorOption;
exports.flattenErrorOptionWith = flattenErrorOptionWith;
exports.flattenErrorOptionWith_ = flattenErrorOptionWith_;
exports.flattenErrorOption_ = flattenErrorOption_;
exports.flip = flip;
exports.flipWith = flipWith;
exports.flipWith_ = flipWith_;
exports.fold = fold;
Object.defineProperty(exports, "foldM", {
  enumerable: true,
  get: function () {
    return P.foldM;
  }
});
Object.defineProperty(exports, "foldM_", {
  enumerable: true,
  get: function () {
    return P.foldM_;
  }
});
exports.fold_ = fold_;
exports.forEach = forEach;
exports.forEach_ = forEach_;
exports.fromEither = fromEither;
exports.fromEitherWith = fromEitherWith;
exports.get = get;
exports.head = head;
exports.ignore = ignore;
exports.isFailure = isFailure;
exports.isSuccess = isSuccess;
exports.join = join;
exports.joinEither = joinEither;
exports.joinEither_ = joinEither_;
exports.join_ = join_;
exports.left = left;
exports.leftOrFail = leftOrFail;
exports.leftOrFailException = leftOrFailException;
exports.leftOrFail_ = leftOrFail_;
Object.defineProperty(exports, "map", {
  enumerable: true,
  get: function () {
    return P.map;
  }
});
exports.mapError = mapError;
exports.mapError_ = mapError_;
Object.defineProperty(exports, "map_", {
  enumerable: true,
  get: function () {
    return P.map_;
  }
});
exports.provideAll = provideAll;
exports.provideAll_ = provideAll_;
Object.defineProperty(exports, "provideSome", {
  enumerable: true,
  get: function () {
    return P.provideSome;
  }
});
Object.defineProperty(exports, "provideSome_", {
  enumerable: true,
  get: function () {
    return P.provideSome_;
  }
});
exports.repeatUntil = repeatUntil;
exports.repeatUntil_ = repeatUntil_;
exports.repeatWhile = repeatWhile;
exports.repeatWhile_ = repeatWhile_;
Object.defineProperty(exports, "retry", {
  enumerable: true,
  get: function () {
    return P.retry;
  }
});
Object.defineProperty(exports, "succeed", {
  enumerable: true,
  get: function () {
    return P.succeed;
  }
});
Object.defineProperty(exports, "succeedWith", {
  enumerable: true,
  get: function () {
    return P.succeedWith;
  }
});
exports.suspend = suspend;
exports.tap = tap;
exports.tap_ = tap_;
exports.toLeft = toLeft;
exports.toLeftWith = toLeftWith;
Object.defineProperty(exports, "unit", {
  enumerable: true,
  get: function () {
    return P.unit;
  }
});
exports.zipWith = zipWith;
exports.zipWith_ = zipWith_;

require("../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../Cause/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index5 = /*#__PURE__*/require("../../Function/index.js");

var _index6 = /*#__PURE__*/require("../../GlobalExceptions/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var _index8 = /*#__PURE__*/require("../../Support/AtomicBoolean/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./_internal/primitives.js"));

var _index9 = /*#__PURE__*/require("./Journal/index.js");

var _index10 = /*#__PURE__*/require("./TryCommit/index.js");

var _index11 = /*#__PURE__*/require("./TxnId/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const MaxFrames = 200;
/**
 * Accesses the environment of the transaction.
 */

exports.MaxFrames = MaxFrames;

function access(f) {
  return P.map_(environment(), f);
}
/**
 * Accesses the environment of the transaction to perform a transaction.
 */


function accessM(f) {
  return P.chain_(environment(), f);
}
/**
 * Submerges the error case of an `Either` into the `STM`. The inverse
 * operation of `STM.either`.
 */


function absolve(z) {
  return P.chain_(z, fromEither);
}
/**
 * Propagates the given environment to self.
 */


function andThen_(self, that) {
  return P.chain_(self, a => provideAll_(that, a));
}
/**
 * Propagates the given environment to self.
 *
 * @ets_data_first andThen_
 */


function andThen(that) {
  return self => andThen_(self, that);
}
/**
 * Maps the success value of this effect to the specified constant value.
 */


function as_(self, b) {
  return P.map_(self, () => b);
}
/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */


function as(b) {
  return self => as_(self, b);
}
/**
 * Maps the success value of this effect to an optional value.
 */


function asSome(self) {
  return P.map_(self, O.some);
}
/**
 * Maps the error value of this effect to an optional value.
 */


function asSomeError(self) {
  return mapError_(self, O.some);
}
/**
 * Returns an `STM` effect whose P.failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */


function bimap_(self, g, f) {
  return P.foldM_(self, e => P.fail(g(e)), a => P.succeed(f(a)));
}
/**
 * Returns an `STM` effect whose P.failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */


function bimap(g, f) {
  return self => bimap_(self, g, f);
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catch_
 */


function _catch(tag, k, f, __trace) {
  return self => P.catchAll_(self, e => {
    if (typeof e === "object" && e !== null && tag in e && e[tag] === k) {
      return f(e);
    }

    return P.fail(e);
  });
}
/**
 * Recovers from specified error.
 */


function catch_(self, tag, k, f) {
  return P.catchAll_(self, e => {
    if (typeof e === "object" && e !== null && tag in e && e[tag] === k) {
      return f(e);
    }

    return P.fail(e);
  });
}
/**
 * Recovers from specified error.
 *
 * @ets_data_first catchTag_
 */


function catchTag(k, f, __trace) {
  return self => catchTag_(self, k, f);
}
/**
 * Recovers from specified error.
 */


function catchTag_(self, k, f) {
  return P.catchAll_(self, e => {
    if ("_tag" in e && e["_tag"] === k) {
      return f(e);
    }

    return P.fail(e);
  });
}
/**
 * Recovers from some or all of the error cases.
 */


function catchSome_(self, f) {
  return P.catchAll_(self, e => O.fold_(f(e), () => P.fail(e), _index5.identity));
}
/**
 * Recovers from some or all of the error cases.
 *
 * @ets_data_first catchSome_
 */


function catchSome(f) {
  return self => catchSome_(self, f);
}
/**
 * Simultaneously filters and flatMaps the value produced by this effect.
 * Continues on the effect returned from pf.
 */


function continueOrRetryM_(fa, pf) {
  return P.chain_(fa, a => O.getOrElse_(pf(a), () => P.retry));
}
/**
 * Simultaneously filters and flatMaps the value produced by this effect.
 * Continues on the effect returned from pf.
 *
 * @ets_data_first continueOrRetryM_
 */


function continueOrRetryM(pf) {
  return fa => continueOrRetryM_(fa, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */


function continueOrRetry_(fa, pf) {
  return continueOrRetryM_(fa, x => O.map_(pf(x), P.succeed));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrRetry_
 */


function continueOrRetry(pf) {
  return fa => continueOrRetry_(fa, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */


function continueOrFailM_(fa, e, pf) {
  return P.chain_(fa, a => O.getOrElse_(pf(a), () => P.fail(e)));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */


function continueOrFailM(e, pf) {
  return fa => continueOrFailM_(fa, e, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */


function continueOrFail_(fa, e, pf) {
  return continueOrFailM_(fa, e, x => O.map_(pf(x), P.succeed));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */


function continueOrFail(e, pf) {
  return fa => continueOrFail_(fa, e, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */


function continueOrFailWithM_(fa, e, pf) {
  return P.chain_(fa, a => O.getOrElse_(pf(a), () => P.failWith(e)));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailWithM_
 */


function continueOrFailWithM(e, pf) {
  return fa => continueOrFailWithM_(fa, e, pf);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */


function continueOrFailWith_(fa, e, pf) {
  return continueOrFailWithM_(fa, e, x => O.map_(pf(x), P.succeed));
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFailWith_
 */


function continueOrFailWith(e, pf) {
  return fa => continueOrFailWith_(fa, e, pf);
}
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @ets_data_first chainError_
 */


function chainError(f) {
  return self => chainError_(self, f);
}
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 */


function chainError_(self, f) {
  return flipWith_(self, x => P.chain_(x, f));
}
/**
 * Checks the condition, and if it's true, returns unit, otherwise, retries.
 */


function checkWith(predicate) {
  return suspend(() => predicate() ? P.unit : P.retry);
}
/**
 * Checks the condition, and if it's true, returns unit, otherwise, retries.
 */


function check(predicate) {
  return checkWith(() => predicate);
}
/**
 * Propagates self environment to that.
 */


function compose_(self, that) {
  return andThen_(that, self);
}
/**
 * Propagates self environment to that.
 *
 * @ets_data_first compose_
 */


function compose(that) {
  return self => andThen_(that, self);
}
/**
 * Commits this transaction atomically.
 */


function commit(self) {
  return T.accessM(r => T.suspend((_, fiberId) => {
    const v = (0, _index9.tryCommit)(fiberId, self, r);

    switch (v._typeId) {
      case _index10.DoneTypeId:
        {
          return v.io;
        }

      case _index10.SuspendTypeId:
        {
          const txnId = (0, _index11.makeTxnId)();
          const done = new _index8.AtomicBoolean(false);
          const interrupt = T.succeedWith(() => done.set(true));
          const io = T.effectAsync((0, _index9.tryCommitAsync)(v.journal, fiberId, self, txnId, done, r));
          return T.ensuring_(io, interrupt);
        }
    }
  }));
}
/**
 * Commits this transaction atomically, regardless of whether the transaction
 * is a success or a failure.
 */


function commitEither(self) {
  return T.absolve(commit(either(self)));
}
/**
 * Kills the fiber running the effect with a `RuntimeError` that contains
 * the specified message.
 */


function dieMessage(message) {
  return P.dieWith(() => new _index2.RuntimeError(message));
}
/**
 * Kills the fiber running the effect with a `RuntimeError` that contains
 * the specified message.
 */


function dieMessageWith(message) {
  return P.succeedWith(() => {
    throw new _index2.RuntimeError(message());
  });
}
/**
 * Converts the failure channel into an `Either`.
 */


function either(self) {
  return fold_(self, x => E.left(x), x => E.right(x));
}
/**
 * Retrieves the environment inside an stm.
 */


function environment() {
  return new P.STMEffect((_, __, r) => r);
}
/**
 * Returns an effect that ignores errors and runs repeatedly until it eventually succeeds.
 */


function eventually(self) {
  return P.foldM_(self, () => eventually(self), P.succeed);
}

function filterOrDie(p, dieWith) {
  return fa => filterOrDie_(fa, p, dieWith);
}

function filterOrDie_(fa, p, dieWith) {
  return filterOrElse_(fa, p, x => P.dieWith(() => dieWith(x)));
}

function filterOrFail(p, failWith) {
  return fa => filterOrFail_(fa, p, failWith);
}

function filterOrFail_(fa, p, failWith) {
  return filterOrElse_(fa, p, x => P.fail(failWith(x)));
}

function filterOrElse(p, or) {
  return fa => filterOrElse_(fa, p, or);
}

function filterOrElse_(fa, p, or) {
  return P.chain_(fa, a => p(a) ? P.succeed(a) : suspend(() => or(a)));
}

function filterOrDieMessage(p, message) {
  return fa => filterOrDieMessage_(fa, p, message);
}

function filterOrDieMessage_(fa, p, message) {
  return filterOrDie_(fa, p, a => new _index2.RuntimeError(message(a)));
}
/**
 * Returns an effect that swaps the error/success cases. This allows you to
 * use all methods on the error channel, possibly before flipping back.
 */


function flip(self) {
  return P.foldM_(self, P.succeed, P.fail);
}
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */


function flipWith(f) {
  return self => flipWith_(self, f);
}
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 */


function flipWith_(self, f) {
  return flip(f(flip(self)));
}
/**
 * Folds over the `STM` effect, handling both P.failure and success, but not
 * retry.
 */


function fold_(self, g, f) {
  return P.foldM_(self, e => P.succeed(g(e)), a => P.succeed(f(a)));
}
/**
 * Folds over the `STM` effect, handling both P.failure and success, but not
 * retry.
 *
 * @ets_data_first fold_
 */


function fold(g, f) {
  return self => fold_(self, g, f);
}
/**
 * Flattens out a nested `STM` effect.
 */


function flatten(self) {
  return P.chain_(self, _index5.identity);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOptionWith_
 */


function flattenErrorOptionWith(def) {
  return self => flattenErrorOptionWith_(self, def);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 */


function flattenErrorOptionWith_(self, def) {
  return mapError_(self, O.fold(def, _index5.identity));
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOption_
 */


function flattenErrorOption(def) {
  return self => flattenErrorOption_(self, def);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 */


function flattenErrorOption_(self, def) {
  return mapError_(self, O.fold(() => def, _index5.identity));
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns a transactional effect that produces a new `ReadonlyArray<B>`.
 */


function forEach_(it, f) {
  return suspend(() => {
    let stm = P.succeed([]);

    for (const a of it) {
      stm = zipWith_(stm, f(a), (acc, b) => {
        acc.push(b);
        return acc;
      });
    }

    return stm;
  });
}
/**
 * Applies the function `f` to each element of the `Iterable<A>` and
 * returns a transactional effect that produces a new `ReadonlyArray<B>`.
 *
 * @ets_data_first forEach_
 */


function forEach(f) {
  return self => forEach_(self, f);
}
/**
 * Lifts an `Either` into a `STM`.
 */


function fromEitherWith(e) {
  return suspend(() => {
    return E.fold_(e(), P.fail, P.succeed);
  });
}
/**
 * Lifts an `Either` into a `STM`.
 */


function fromEither(e) {
  return E.fold_(e, P.fail, P.succeed);
}
/**
 * Unwraps the optional success of this effect, but can fail with an None value.
 */


function get(self) {
  return P.foldM_(self, x => P.fail(O.some(x)), O.fold(() => P.fail(O.none), P.succeed));
}
/**
 * Returns a successful effect with the head of the list if the list is
 * non-empty or fails with the error `None` if the list is empty.
 */


function head(self) {
  return P.foldM_(self, x => P.fail(O.some(x)), x => {
    const it = x[Symbol.iterator]();
    const next = it.next();
    return next.done ? P.fail(O.none) : P.succeed(next.value);
  });
}
/**
 * Returns a new effect that ignores the success or failure of this effect.
 */


function ignore(self) {
  return fold_(self, _index5.constVoid, _index5.constVoid);
}
/**
 * Returns whether this effect is a failure.
 */


function isFailure(self) {
  return fold_(self, () => true, () => false);
}
/**
 * Returns whether this effect is a success.
 */


function isSuccess(self) {
  return fold_(self, () => false, () => true);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error `None`.
 */


function left(self) {
  return P.foldM_(self, e => P.fail(O.some(e)), E.fold(P.succeed, () => P.fail(O.none)));
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 */


function leftOrFail_(self, orFail) {
  return P.chain_(self, E.fold(P.succeed, x => P.failWith(() => orFail(x))));
}
/**
 * Returns a successful effect if the value is `Left`, or fails with the error e.
 *
 * @ets_data_first leftOrFail_
 */


function leftOrFail(orFail) {
  return self => leftOrFail_(self, orFail);
}
/**
 * Returns a successful effect if the value is `Left`, or fails with a `NoSuchElementException`.
 */


function leftOrFailException(self) {
  return leftOrFail_(self, () => new _index6.NoSuchElementException());
}
/**
 * Depending on provided environment returns either this one or the other effect.
 *
 * @ets_data_first join_
 */


function join(that) {
  return self => {
    return join_(self, that);
  };
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function join_(self, that) {
  return accessM(_ => E.fold_(_, r => provideAll_(self, r), r1 => provideAll_(that, r1)));
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function joinEither_(self, that) {
  return accessM(_ => E.fold_(_, r => P.map_(provideAll_(self, r), E.left), r1 => P.map_(provideAll_(that, r1), E.right)));
}
/**
 * Depending on provided environment returns either this one or the other effect.
 */


function joinEither(that) {
  return self => joinEither_(self, that);
}
/**
 * Maps from one error type to another.
 */


function mapError_(self, f) {
  return P.foldM_(self, e => P.fail(f(e)), P.succeed);
}
/**
 * Maps from one error type to another.
 *
 * @ets_data_first mapError_
 */


function mapError(f) {
  return self => mapError_(self, f);
}
/**
 * Provides the transaction its required environment, which eliminates
 * its dependency on `R`.
 */


function provideAll_(self, r) {
  return P.provideSome_(self, () => r);
}
/**
 * Provides the transaction its required environment, which eliminates
 * its dependency on `R`.
 *
 * @ets_data_first provideAll_
 */


function provideAll(r) {
  return self => provideAll_(self, r);
}
/**
 * Repeats this `STM` effect until its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatUntil` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryUntil` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually satisfy the predicate.
 */


function repeatUntil_(self, f) {
  return P.chain_(self, a => f(a) ? P.succeed(a) : repeatUntil_(self, f));
}
/**
 * Repeats this `STM` effect until its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatUntil` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryUntil` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually satisfy the predicate.
 *
 * @ets_data_first repeatUntil_
 */


function repeatUntil(f) {
  return self => repeatUntil_(self, f);
}
/**
 * Repeats this `STM` effect while its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatWhile` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryWhile` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually not satisfy the predicate.
 */


function repeatWhile_(self, f) {
  return P.chain_(self, a => f(a) ? repeatWhile_(self, f) : P.succeed(a));
}
/**
 * Repeats this `STM` effect while its result satisfies the specified predicate.
 *
 * WARNING:
 * `repeatWhile` uses a busy loop to repeat the effect and will consume a thread until
 * it completes (it cannot yield). This is because STM describes a single atomic
 * transaction which must either complete, retry or fail a transaction before
 * yielding back to the Effect Runtime.
 *
 * - Use `retryWhile` instead if you don't need to maintain transaction state for repeats.
 * - Ensure repeating the STM effect will eventually not satisfy the predicate.
 *
 * @ets_data_first repeatWhile_
 */


function repeatWhile(f) {
  return self => repeatWhile_(self, f);
}
/**
 * Suspends creation of the specified transaction lazily.
 */


function suspend(f) {
  return flatten(P.succeedWith(f));
}
/**
 * "Peeks" at the success of transactional effect.
 */


function tap_(self, f) {
  return P.chain_(self, a => as_(f(a), a));
}
/**
 * "Peeks" at the success of transactional effect.
 *
 * @ets_data_first tap_
 */


function tap(f) {
  return self => tap_(self, f);
}
/**
 * Returns an effect with the value on the left part.
 */


function toLeftWith(a) {
  return P.chain_(P.succeedWith(a), x => P.succeed(E.left(x)));
}
/**
 * Returns an effect with the value on the left part.
 */


function toLeft(a) {
  return P.succeed(E.left(a));
}
/**
 * Sequentially zips this value with the specified one, combining the values
 * using the specified combiner function.
 */


function zipWith_(self, that, f) {
  return P.chain_(self, a => P.map_(that, b => f(a, b)));
}
/**
 * Sequentially zips this value with the specified one, combining the values
 * using the specified combiner function.
 *
 * @ets_data_first zipWith_
 */


function zipWith(that, f) {
  return self => P.chain_(self, a => P.map_(that, b => f(a, b)));
}
//# sourceMappingURL=core.js.map