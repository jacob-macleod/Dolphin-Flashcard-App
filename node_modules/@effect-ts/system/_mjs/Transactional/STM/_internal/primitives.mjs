var _a; // ets_tracing: off


import * as T from "../../../Effect/index.mjs";
import * as E from "../../../Either/index.mjs";
export const STMTypeId = /*#__PURE__*/Symbol();
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

export class STM {
  constructor() {
    this[_a] = STMTypeId;
  }

}
_a = STMTypeId, T._R, T._E, T._A;
export const STMEffectTypeId = /*#__PURE__*/Symbol();
export class STMEffect extends STM {
  constructor(f) {
    super();
    this.f = f;
    this._typeId = STMEffectTypeId;
  }

}
export const STMOnFailureTypeId = /*#__PURE__*/Symbol();
export class STMOnFailure extends STM {
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
export const STMOnRetryTypeId = /*#__PURE__*/Symbol();
export class STMOnRetry extends STM {
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
export const STMOnSuccessTypeId = /*#__PURE__*/Symbol();
export class STMOnSuccess extends STM {
  constructor(stm, apply) {
    super();
    this.stm = stm;
    this.apply = apply;
    this._typeId = STMOnSuccessTypeId;
  }

}
export const STMSucceedTypeId = /*#__PURE__*/Symbol();
export class STMSucceed extends STM {
  constructor(a) {
    super();
    this.a = a;
    this._typeId = STMSucceedTypeId;
  }

}
export const STMSucceedNowTypeId = /*#__PURE__*/Symbol();
export class STMSucceedNow extends STM {
  constructor(a) {
    super();
    this.a = a;
    this._typeId = STMSucceedNowTypeId;
  }

}
export const STMProvideSomeTypeId = /*#__PURE__*/Symbol();
export class STMProvideSome extends STM {
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

export function concreteSTM(_) {//
}
export const FailExceptionTypeId = /*#__PURE__*/Symbol();
export class STMFailException {
  constructor(e) {
    this.e = e;
    this._typeId = FailExceptionTypeId;
  }

}
export function isFailException(u) {
  return typeof u === "object" && u != null && "_typeId" in u && u["_typeId"] === FailExceptionTypeId;
}
export const DieExceptionTypeId = /*#__PURE__*/Symbol();
export class STMDieException {
  constructor(e) {
    this.e = e;
    this._typeId = DieExceptionTypeId;
  }

}
export function isDieException(u) {
  return typeof u === "object" && u != null && "_typeId" in u && u["_typeId"] === DieExceptionTypeId;
}
export const RetryExceptionTypeId = /*#__PURE__*/Symbol();
export class STMRetryException {
  constructor() {
    this._typeId = RetryExceptionTypeId;
  }

}
export function isRetryException(u) {
  return typeof u === "object" && u != null && "_typeId" in u && u["_typeId"] === RetryExceptionTypeId;
} //
// primitive ops
//

/**
 * Returns an `STM` effect that succeeds with the specified value.
 */

export function succeed(a) {
  return new STMSucceedNow(a);
}
/**
 * Returns an `STM` effect that succeeds with the specified value.
 */

export function succeedWith(a) {
  return new STMSucceed(a);
}
/**
 * Returns a value that models failure in the transaction.
 */

export function fail(e) {
  return new STMEffect(() => {
    throw new STMFailException(e);
  });
}
/**
 * Returns a value that models failure in the transaction.
 */

export function failWith(e) {
  return new STMEffect(() => {
    throw new STMFailException(e());
  });
}
/**
 * Kills the fiber running the effect.
 */

export function die(u) {
  return new STMEffect(() => {
    throw new STMDieException(u);
  });
}
/**
 * Kills the fiber running the effect.
 */

export function dieWith(u) {
  return new STMEffect(() => {
    throw new STMDieException(u());
  });
}
/**
 * Maps the value produced by the effect.
 */

export function map_(self, f) {
  return chain_(self, a => succeed(f(a)));
}
/**
 * Maps the value produced by the effect.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Feeds the value produced by this effect to the specified function,
 * and then runs the returned effect as well to produce its results.
 */

export function chain_(self, f) {
  return new STMOnSuccess(self, f);
}
/**
 * Feeds the value produced by this effect to the specified function,
 * and then runs the returned effect as well to produce its results.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => chain_(self, f);
}
/**
 * Recovers from all errors.
 */

export function catchAll_(self, f) {
  return new STMOnFailure(self, f);
}
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */

export function catchAll(f) {
  return self => catchAll_(self, f);
}
/**
 * Effectfully folds over the `STM` effect, handling both failure and
 * success.
 */

export function foldM_(self, g, f) {
  return chain_(catchAll_(map_(self, E.right), e => map_(g(e), E.left)), E.fold(succeed, f));
}
/**
 * Effectfully folds over the `STM` effect, handling both failure and
 * success.
 *
 * @ets_data_first foldM_
 */

export function foldM(g, f) {
  return self => foldM_(self, g, f);
}
/**
 * Executes the specified finalization transaction whether or
 * not this effect succeeds. Note that as with all STM transactions,
 * if the full transaction fails, everything will be rolled back.
 */

export function ensuring_(self, finalizer) {
  return foldM_(self, e => chain_(finalizer, () => fail(e)), a => chain_(finalizer, () => succeed(a)));
}
/**
 * Executes the specified finalization transaction whether or
 * not this effect succeeds. Note that as with all STM transactions,
 * if the full transaction fails, everything will be rolled back.
 *
 * @ets_data_first ensuring_
 */

export function ensuring(finalizer) {
  return self => ensuring_(self, finalizer);
}
/**
 * Abort and retry the whole transaction when any of the underlying
 * transactional variables have changed.
 */

export const retry = /*#__PURE__*/new STMEffect(() => {
  throw new STMRetryException();
});
/**
 * Returns an `STM` effect that succeeds with `Unit`.
 */

export const unit = /*#__PURE__*/succeed(undefined);
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */

export function provideSome_(self, f) {
  return new STMProvideSome(self, f);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 *
 * @ets_data_first provideSome_
 */

export function provideSome(f) {
  return self => provideSome_(self, f);
}
//# sourceMappingURL=primitives.mjs.map