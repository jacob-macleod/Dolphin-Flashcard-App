"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STMTypeId = exports.STMSucceedTypeId = exports.STMSucceedNowTypeId = exports.STMSucceedNow = exports.STMSucceed = exports.STMRetryException = exports.STMProvideSomeTypeId = exports.STMProvideSome = exports.STMOnSuccessTypeId = exports.STMOnSuccess = exports.STMOnRetryTypeId = exports.STMOnRetry = exports.STMOnFailureTypeId = exports.STMOnFailure = exports.STMFailException = exports.STMEffectTypeId = exports.STMEffect = exports.STMDieException = exports.STM = exports.RetryExceptionTypeId = exports.FailExceptionTypeId = exports.DieExceptionTypeId = void 0;
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;
exports.chain = chain;
exports.chain_ = chain_;
exports.concreteSTM = concreteSTM;
exports.die = die;
exports.dieWith = dieWith;
exports.ensuring = ensuring;
exports.ensuring_ = ensuring_;
exports.fail = fail;
exports.failWith = failWith;
exports.foldM = foldM;
exports.foldM_ = foldM_;
exports.isDieException = isDieException;
exports.isFailException = isFailException;
exports.isRetryException = isRetryException;
exports.map = map;
exports.map_ = map_;
exports.provideSome = provideSome;
exports.provideSome_ = provideSome_;
exports.retry = void 0;
exports.succeed = succeed;
exports.succeedWith = succeedWith;
exports.unit = void 0;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Either/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a; // ets_tracing: off


const STMTypeId = /*#__PURE__*/Symbol();
/**
 * `STM<R, E, A>` represents an effect that can be performed transactionally,
 *  resulting in a failure `E` or a value `A` that may require an environment
 *  `R` to execute.
 *
 * Software Transactional Memory is a technique which allows composition of arbitrary atomic operations.  It is
 *  the software analog of transactions in database systems.
 *
 * The API is lifted directly from the Haskell package Control.Concurrent.STM although the implementation does not
 *  resemble the Haskell one at all.
 *  [[http://hackage.haskell.org/package/stm-2.5.0.0/docs/Control-Concurrent-STM.html]]
 *
 * STM in Haskell was introduced in:
 *  Composable memory transactions, by Tim Harris, Simon Marlow, Simon Peyton Jones, and Maurice Herlihy, in ACM
 *  Conference on Principles and Practice of Parallel Programming 2005.
 *  [[https://www.microsoft.com/en-us/research/publication/composable-memory-transactions/]]
 *
 * See also:
 *  Lock Free Data Structures using STMs in Haskell, by Anthony Discolo, Tim Harris, Simon Marlow, Simon Peyton Jones,
 *  Satnam Singh) FLOPS 2006: Eighth International Symposium on Functional and Logic Programming, Fuji Susono, JAPAN,
 *  April 2006
 *  [[https://www.microsoft.com/en-us/research/publication/lock-free-data-structures-using-stms-in-haskell/]]
 *
 * The implemtation is based on the ZIO STM module, while JS environments have no race conditions from multiple threads
 *  STM provides greater benefits for syncronisation of Fibers and transactional data-types can be quite useful.
 */

exports.STMTypeId = STMTypeId;

class STM {
  constructor() {
    this[_a] = STMTypeId;
  }

}

exports.STM = STM;
_a = STMTypeId, T._R, T._E, T._A;
const STMEffectTypeId = /*#__PURE__*/Symbol();
exports.STMEffectTypeId = STMEffectTypeId;

class STMEffect extends STM {
  constructor(f) {
    super();
    this.f = f;
    this._typeId = STMEffectTypeId;
  }

}

exports.STMEffect = STMEffect;
const STMOnFailureTypeId = /*#__PURE__*/Symbol();
exports.STMOnFailureTypeId = STMOnFailureTypeId;

class STMOnFailure extends STM {
  constructor(stm, onFailure) {
    super();
    this.stm = stm;
    this.onFailure = onFailure;
    this._typeId = STMOnFailureTypeId;
  }

  apply(a) {
    return new STMSucceedNow(a);
  }

}

exports.STMOnFailure = STMOnFailure;
const STMOnRetryTypeId = /*#__PURE__*/Symbol();
exports.STMOnRetryTypeId = STMOnRetryTypeId;

class STMOnRetry extends STM {
  constructor(stm, onRetry) {
    super();
    this.stm = stm;
    this.onRetry = onRetry;
    this._typeId = STMOnRetryTypeId;
  }

  apply(a) {
    return new STMSucceedNow(a);
  }

}

exports.STMOnRetry = STMOnRetry;
const STMOnSuccessTypeId = /*#__PURE__*/Symbol();
exports.STMOnSuccessTypeId = STMOnSuccessTypeId;

class STMOnSuccess extends STM {
  constructor(stm, apply) {
    super();
    this.stm = stm;
    this.apply = apply;
    this._typeId = STMOnSuccessTypeId;
  }

}

exports.STMOnSuccess = STMOnSuccess;
const STMSucceedTypeId = /*#__PURE__*/Symbol();
exports.STMSucceedTypeId = STMSucceedTypeId;

class STMSucceed extends STM {
  constructor(a) {
    super();
    this.a = a;
    this._typeId = STMSucceedTypeId;
  }

}

exports.STMSucceed = STMSucceed;
const STMSucceedNowTypeId = /*#__PURE__*/Symbol();
exports.STMSucceedNowTypeId = STMSucceedNowTypeId;

class STMSucceedNow extends STM {
  constructor(a) {
    super();
    this.a = a;
    this._typeId = STMSucceedNowTypeId;
  }

}

exports.STMSucceedNow = STMSucceedNow;
const STMProvideSomeTypeId = /*#__PURE__*/Symbol();
exports.STMProvideSomeTypeId = STMProvideSomeTypeId;

class STMProvideSome extends STM {
  constructor(stm, f) {
    super();
    this.stm = stm;
    this.f = f;
    this._typeId = STMProvideSomeTypeId;
  }

}
/**
 * @ets_optimize remove
 */


exports.STMProvideSome = STMProvideSome;

function concreteSTM(_) {//
}

const FailExceptionTypeId = /*#__PURE__*/Symbol();
exports.FailExceptionTypeId = FailExceptionTypeId;

class STMFailException {
  constructor(e) {
    this.e = e;
    this._typeId = FailExceptionTypeId;
  }

}

exports.STMFailException = STMFailException;

function isFailException(u) {
  return typeof u === "object" && u != null && "_typeId" in u && u["_typeId"] === FailExceptionTypeId;
}

const DieExceptionTypeId = /*#__PURE__*/Symbol();
exports.DieExceptionTypeId = DieExceptionTypeId;

class STMDieException {
  constructor(e) {
    this.e = e;
    this._typeId = DieExceptionTypeId;
  }

}

exports.STMDieException = STMDieException;

function isDieException(u) {
  return typeof u === "object" && u != null && "_typeId" in u && u["_typeId"] === DieExceptionTypeId;
}

const RetryExceptionTypeId = /*#__PURE__*/Symbol();
exports.RetryExceptionTypeId = RetryExceptionTypeId;

class STMRetryException {
  constructor() {
    this._typeId = RetryExceptionTypeId;
  }

}

exports.STMRetryException = STMRetryException;

function isRetryException(u) {
  return typeof u === "object" && u != null && "_typeId" in u && u["_typeId"] === RetryExceptionTypeId;
} //
// primitive ops
//

/**
 * Returns an `STM` effect that succeeds with the specified value.
 */


function succeed(a) {
  return new STMSucceedNow(a);
}
/**
 * Returns an `STM` effect that succeeds with the specified value.
 */


function succeedWith(a) {
  return new STMSucceed(a);
}
/**
 * Returns a value that models failure in the transaction.
 */


function fail(e) {
  return new STMEffect(() => {
    throw new STMFailException(e);
  });
}
/**
 * Returns a value that models failure in the transaction.
 */


function failWith(e) {
  return new STMEffect(() => {
    throw new STMFailException(e());
  });
}
/**
 * Kills the fiber running the effect.
 */


function die(u) {
  return new STMEffect(() => {
    throw new STMDieException(u);
  });
}
/**
 * Kills the fiber running the effect.
 */


function dieWith(u) {
  return new STMEffect(() => {
    throw new STMDieException(u());
  });
}
/**
 * Maps the value produced by the effect.
 */


function map_(self, f) {
  return chain_(self, a => succeed(f(a)));
}
/**
 * Maps the value produced by the effect.
 *
 * @ets_data_first map_
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Feeds the value produced by this effect to the specified function,
 * and then runs the returned effect as well to produce its results.
 */


function chain_(self, f) {
  return new STMOnSuccess(self, f);
}
/**
 * Feeds the value produced by this effect to the specified function,
 * and then runs the returned effect as well to produce its results.
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return self => chain_(self, f);
}
/**
 * Recovers from all errors.
 */


function catchAll_(self, f) {
  return new STMOnFailure(self, f);
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */


function catchAll(f) {
  return self => catchAll_(self, f);
}
/**
 * Effectfully folds over the `STM` effect, handling both failure and
 * success.
 */


function foldM_(self, g, f) {
  return chain_(catchAll_(map_(self, E.right), e => map_(g(e), E.left)), E.fold(succeed, f));
}
/**
 * Effectfully folds over the `STM` effect, handling both failure and
 * success.
 *
 * @ets_data_first foldM_
 */


function foldM(g, f) {
  return self => foldM_(self, g, f);
}
/**
 * Executes the specified finalization transaction whether or
 * not this effect succeeds. Note that as with all STM transactions,
 * if the full transaction fails, everything will be rolled back.
 */


function ensuring_(self, finalizer) {
  return foldM_(self, e => chain_(finalizer, () => fail(e)), a => chain_(finalizer, () => succeed(a)));
}
/**
 * Executes the specified finalization transaction whether or
 * not this effect succeeds. Note that as with all STM transactions,
 * if the full transaction fails, everything will be rolled back.
 *
 * @ets_data_first ensuring_
 */


function ensuring(finalizer) {
  return self => ensuring_(self, finalizer);
}
/**
 * Abort and retry the whole transaction when any of the underlying
 * transactional variables have changed.
 */


const retry = /*#__PURE__*/new STMEffect(() => {
  throw new STMRetryException();
});
/**
 * Returns an `STM` effect that succeeds with `Unit`.
 */

exports.retry = retry;
const unit = /*#__PURE__*/succeed(undefined);
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */

exports.unit = unit;

function provideSome_(self, f) {
  return new STMProvideSome(self, f);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 *
 * @ets_data_first provideSome_
 */


function provideSome(f) {
  return self => provideSome_(self, f);
}
//# sourceMappingURL=primitives.js.map