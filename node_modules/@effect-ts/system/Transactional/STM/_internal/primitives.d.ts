import * as T from "../../../Effect/index.js";
import type { FiberID } from "../../../Fiber/index.js";
import type { Journal } from "../Journal/index.js";
export declare const STMTypeId: unique symbol;
export declare type STMTypeId = typeof STMTypeId;
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
export declare abstract class STM<R, E, A> {
    readonly [STMTypeId]: STMTypeId;
    readonly [T._R]: (_: R) => void;
    readonly [T._E]: () => E;
    readonly [T._A]: () => A;
}
export declare const STMEffectTypeId: unique symbol;
export declare type STMEffectTypeId = typeof STMEffectTypeId;
export declare class STMEffect<R, E, A> extends STM<R, E, A> {
    readonly f: (journal: Journal, fiberId: FiberID, r: R) => A;
    readonly _typeId: STMEffectTypeId;
    constructor(f: (journal: Journal, fiberId: FiberID, r: R) => A);
}
export declare const STMOnFailureTypeId: unique symbol;
export declare type STMOnFailureTypeId = typeof STMOnFailureTypeId;
export declare class STMOnFailure<R, E, E1, A> extends STM<R, E1, A> {
    readonly stm: STM<R, E, A>;
    readonly onFailure: (e: E) => STM<R, E1, A>;
    readonly _typeId: STMOnFailureTypeId;
    constructor(stm: STM<R, E, A>, onFailure: (e: E) => STM<R, E1, A>);
    apply(a: A): STM<R, E, A>;
}
export declare const STMOnRetryTypeId: unique symbol;
export declare type STMOnRetryTypeId = typeof STMOnRetryTypeId;
export declare class STMOnRetry<R, E, A> extends STM<R, E, A> {
    readonly stm: STM<R, E, A>;
    readonly onRetry: STM<R, E, A>;
    readonly _typeId: STMOnRetryTypeId;
    constructor(stm: STM<R, E, A>, onRetry: STM<R, E, A>);
    apply(a: A): STM<R, E, A>;
}
export declare const STMOnSuccessTypeId: unique symbol;
export declare type STMOnSuccessTypeId = typeof STMOnSuccessTypeId;
export declare class STMOnSuccess<R, E, A, B> extends STM<R, E, B> {
    readonly stm: STM<R, E, A>;
    readonly apply: (a: A) => STM<R, E, B>;
    readonly _typeId: STMOnSuccessTypeId;
    constructor(stm: STM<R, E, A>, apply: (a: A) => STM<R, E, B>);
}
export declare const STMSucceedTypeId: unique symbol;
export declare type STMSucceedTypeId = typeof STMSucceedTypeId;
export declare class STMSucceed<R, E, A> extends STM<R, E, A> {
    readonly a: () => A;
    readonly _typeId: STMSucceedTypeId;
    constructor(a: () => A);
}
export declare const STMSucceedNowTypeId: unique symbol;
export declare type STMSucceedNowTypeId = typeof STMSucceedNowTypeId;
export declare class STMSucceedNow<R, E, A> extends STM<R, E, A> {
    readonly a: A;
    readonly _typeId: STMSucceedNowTypeId;
    constructor(a: A);
}
export declare const STMProvideSomeTypeId: unique symbol;
export declare type STMProvideSomeTypeId = typeof STMProvideSomeTypeId;
export declare class STMProvideSome<R0, R, E, A> extends STM<R, E, A> {
    readonly stm: STM<R0, E, A>;
    readonly f: (r: R) => R0;
    readonly _typeId: STMProvideSomeTypeId;
    constructor(stm: STM<R0, E, A>, f: (r: R) => R0);
}
/**
 * @ets_optimize remove
 */
export declare function concreteSTM<R, E, A>(_: STM<R, E, A>): asserts _ is STMEffect<R, E, A> | STMOnFailure<R, unknown, E, A> | STMOnSuccess<R, E, unknown, A> | STMOnRetry<R, E, A> | STMSucceed<R, E, A> | STMSucceedNow<R, E, A> | STMProvideSome<unknown, R, E, A>;
export declare const FailExceptionTypeId: unique symbol;
export declare type FailExceptionTypeId = typeof FailExceptionTypeId;
export declare class STMFailException<E> {
    readonly e: E;
    readonly _typeId: FailExceptionTypeId;
    constructor(e: E);
}
export declare function isFailException(u: unknown): u is STMFailException<unknown>;
export declare const DieExceptionTypeId: unique symbol;
export declare type DieExceptionTypeId = typeof DieExceptionTypeId;
export declare class STMDieException<E> {
    readonly e: E;
    readonly _typeId: DieExceptionTypeId;
    constructor(e: E);
}
export declare function isDieException(u: unknown): u is STMDieException<unknown>;
export declare const RetryExceptionTypeId: unique symbol;
export declare type RetryExceptionTypeId = typeof RetryExceptionTypeId;
export declare class STMRetryException {
    readonly _typeId: RetryExceptionTypeId;
}
export declare function isRetryException(u: unknown): u is STMRetryException;
/**
 * Returns an `STM` effect that succeeds with the specified value.
 */
export declare function succeed<A>(a: A): STM<unknown, never, A>;
/**
 * Returns an `STM` effect that succeeds with the specified value.
 */
export declare function succeedWith<A>(a: () => A): STM<unknown, never, A>;
/**
 * Returns a value that models failure in the transaction.
 */
export declare function fail<E>(e: E): STM<unknown, E, never>;
/**
 * Returns a value that models failure in the transaction.
 */
export declare function failWith<E>(e: () => E): STM<unknown, E, never>;
/**
 * Kills the fiber running the effect.
 */
export declare function die(u: unknown): STM<unknown, never, never>;
/**
 * Kills the fiber running the effect.
 */
export declare function dieWith(u: () => unknown): STM<unknown, never, never>;
/**
 * Maps the value produced by the effect.
 */
export declare function map_<R, E, A, B>(self: STM<R, E, A>, f: (a: A) => B): STM<R, E, B>;
/**
 * Maps the value produced by the effect.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): <R, E>(self: STM<R, E, A>) => STM<R, E, B>;
/**
 * Feeds the value produced by this effect to the specified function,
 * and then runs the returned effect as well to produce its results.
 */
export declare function chain_<R, E, A, R1, E1, B>(self: STM<R, E, A>, f: (a: A) => STM<R1, E1, B>): STM<R1 & R, E | E1, B>;
/**
 * Feeds the value produced by this effect to the specified function,
 * and then runs the returned effect as well to produce its results.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, R1, E1, B>(f: (a: A) => STM<R1, E1, B>): <R, E>(self: STM<R, E, A>) => STM<R1 & R, E | E1, B>;
/**
 * Recovers from all errors.
 */
export declare function catchAll_<R, E, A, R1, E1, B>(self: STM<R, E, A>, f: (e: E) => STM<R1, E1, B>): STM<R1 & R, E1, A | B>;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */
export declare function catchAll<E, R1, E1, B>(f: (e: E) => STM<R1, E1, B>): <R, A>(self: STM<R, E, A>) => STM<R1 & R, E1, A | B>;
/**
 * Effectfully folds over the `STM` effect, handling both failure and
 * success.
 */
export declare function foldM_<R, E, A, R1, E1, B, R2, E2, C>(self: STM<R, E, A>, g: (e: E) => STM<R2, E2, C>, f: (a: A) => STM<R1, E1, B>): STM<R1 & R2 & R, E1 | E2, B | C>;
/**
 * Effectfully folds over the `STM` effect, handling both failure and
 * success.
 *
 * @ets_data_first foldM_
 */
export declare function foldM<E, A, R1, E1, B, R2, E2, C>(g: (e: E) => STM<R2, E2, C>, f: (a: A) => STM<R1, E1, B>): <R>(self: STM<R, E, A>) => STM<R1 & R2 & R, E1 | E2, B | C>;
/**
 * Executes the specified finalization transaction whether or
 * not this effect succeeds. Note that as with all STM transactions,
 * if the full transaction fails, everything will be rolled back.
 */
export declare function ensuring_<R, E, A, R1, B>(self: STM<R, E, A>, finalizer: STM<R1, never, B>): STM<R & R1, E, A>;
/**
 * Executes the specified finalization transaction whether or
 * not this effect succeeds. Note that as with all STM transactions,
 * if the full transaction fails, everything will be rolled back.
 *
 * @ets_data_first ensuring_
 */
export declare function ensuring<R1, B>(finalizer: STM<R1, never, B>): <R, E, A>(self: STM<R, E, A>) => STM<R & R1, E, A>;
/**
 * Abort and retry the whole transaction when any of the underlying
 * transactional variables have changed.
 */
export declare const retry: STM<unknown, never, never>;
/**
 * Returns an `STM` effect that succeeds with `Unit`.
 */
export declare const unit: STM<unknown, never, void>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
export declare function provideSome_<R, E, A, R0>(self: STM<R, E, A>, f: (r: R0) => R): STM<R0, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 *
 * @ets_data_first provideSome_
 */
export declare function provideSome<R, R0>(f: (r: R0) => R): <E, A>(self: STM<R, E, A>) => STM<R0, E, A>;
//# sourceMappingURL=primitives.d.ts.map