import type * as Tp from "../Collections/Immutable/Tuple/index.js";
import type { Either } from "../Either/core.js";
import type { _A, _E, _R, HasUnify } from "../Utils/index.js";
import * as X from "../XPure/index.js";
export interface Sync<R, E, A> extends X.XPure<unknown, unknown, unknown, R, E, A>, HasUnify {
}
export interface UIO<A> extends Sync<unknown, never, A> {
}
export interface RIO<R, A> extends Sync<R, never, A> {
}
export interface IO<E, A> extends Sync<unknown, E, A> {
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */
export declare const chain: <A, R1, E1, B>(f: (a: A) => Sync<R1, E1, B>) => <R, E>(self: Sync<R, E, A>) => Sync<R & R1, E1 | E, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare const chain_: <R, E, A, R1, E1, B>(self: Sync<R, E, A>, f: (a: A) => Sync<R1, E1, B>) => Sync<R & R1, E | E1, B>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */
export declare const tap: <A, R1, E1, X>(f: (a: A) => Sync<R1, E1, X>) => <R, E>(self: Sync<R, E, A>) => Sync<R & R1, E1 | E, A>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare const tap_: <R, E, A, R1, E1, X>(self: Sync<R, E, A>, f: (a: A) => Sync<R1, E1, X>) => Sync<R & R1, E | E1, A>;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */
export declare const succeed: <A>(a: A) => Sync<unknown, never, A>;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */
export declare const fail: <E>(a: E) => Sync<unknown, E, never>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare const map_: <R, E, A, B>(self: Sync<R, E, A>, f: (a: A) => B) => Sync<R, E, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */
export declare const map: <A, B>(f: (a: A) => B) => <R, E>(self: Sync<R, E, A>) => Sync<R, E, B>;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */
export declare const foldM_: <R, E, A, R1, E1, B, R2, E2, C>(self: Sync<R, E, A>, failure: (e: E) => Sync<R1, E1, B>, success: (a: A) => Sync<R2, E2, C>) => Sync<R & R1 & R2, E1 | E2, B | C>;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 *
 * @ets_data_first foldM_
 */
export declare const foldM: <E, A, R1, E1, B, R2, E2, C>(failure: (e: E) => Sync<R1, E1, B>, success: (a: A) => Sync<R2, E2, C>) => <R>(self: Sync<R, E, A>) => Sync<R & R1 & R2, E1 | E2, B | C>;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 *
 * @ets_data_first fold_
 */
export declare const fold: <E, A, B, C>(failure: (e: E) => B, success: (a: A) => C) => <R>(self: Sync<R, E, A>) => Sync<R, never, B | C>;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */
export declare const fold_: <R, E, A, B, C>(self: Sync<R, E, A>, failure: (e: E) => B, success: (a: A) => C) => Sync<R, never, B | C>;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */
export declare const catchAll: <S1, E, S3, R1, E1, B>(failure: (e: E) => Sync<R1, E1, B>) => <R, A>(self: Sync<R, E, A>) => Sync<R & R1, E1, B | A>;
/**
 * Recovers from all errors.
 */
export declare const catchAll_: <R, E, A, R1, E1, B>(self: Sync<R, E, A>, failure: (e: E) => Sync<R1, E1, B>) => Sync<R & R1, E1, A | B>;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */
export declare const bimap: <E, A, E1, A1>(f: (e: E) => E1, g: (a: A) => A1) => <R>(self: Sync<R, E, A>) => Sync<R, E1, A1>;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */
export declare const bimap_: <R, E, A, E1, A1>(self: Sync<R, E, A>, f: (e: E) => E1, g: (a: A) => A1) => Sync<R, E1, A1>;
/**
 * Transforms the error type of this computation with the specified
 * function.
 *
 * @ets_data_first mapError_
 */
export declare const mapError: <E, E1>(f: (e: E) => E1) => <R, A>(self: Sync<R, E, A>) => Sync<R, E1, A>;
/**
 * Transforms the error type of this computation with the specified
 * function.
 */
export declare const mapError_: <R, E, A, E1>(self: Sync<R, E, A>, f: (e: E) => E1) => Sync<R, E1, A>;
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */
export declare const unit: Sync<unknown, never, void>;
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */
export declare const provideSome: <R0, R1>(f: (s: R0) => R1) => <E, A>(self: Sync<R1, E, A>) => Sync<R0, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
export declare const provide: <R>(r: R) => <E, A, R0>(next: Sync<R & R0, E, A>) => Sync<R0, E, A>;
/**
 * Provides this computation with its required environment.
 *
 * @ets_data_first provideAll_
 */
export declare const provideAll: <R>(r: R) => <E, A>(self: Sync<R, E, A>) => Sync<unknown, E, A>;
/**
 * Provides this computation with its required environment.
 */
export declare const provideAll_: <R, E, A>(self: Sync<R, E, A>, r: R) => Sync<unknown, E, A>;
/**
 * Access the environment monadically
 */
export declare const accessM: <R, R1, E, A>(f: (_: R) => Sync<R1, E, A>) => Sync<R1 & R, E, A>;
/**
 * Access the environment with the function f
 */
export declare const access: <R, A>(f: (_: R) => A) => Sync<R, never, A>;
/**
 * Access the environment
 */
export declare const environment: <R>() => Sync<R, never, R>;
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */
export declare const either: <R, E, A>(self: Sync<R, E, A>) => Sync<R, never, Either<E, A>>;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */
export declare const orElseEither: <R2, E2, A2>(that: () => Sync<R2, E2, A2>) => <R, E, A>(self: Sync<R, E, A>) => Sync<R & R2, E2, Either<A, A2>>;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */
export declare const orElseEither_: <R, E, A, R2, E2, A2>(self: Sync<R, E, A>, that: () => Sync<R2, E2, A2>) => Sync<R & R2, E2, Either<A, A2>>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */
export declare const zipWith: <R1, E1, A, B, C>(that: Sync<R1, E1, B>, f: (a: A, b: B) => C) => <R, E>(self: Sync<R, E, A>) => Sync<R & R1, E1 | E, C>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */
export declare const zipWith_: <R, E, A, R1, E1, B, C>(self: Sync<R, E, A>, that: Sync<R1, E1, B>, f: (a: A, b: B) => C) => Sync<R & R1, E | E1, C>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */
export declare const zip: <R1, E1, B>(that: Sync<R1, E1, B>) => <R, E, A>(self: Sync<R, E, A>) => Sync<R & R1, E1 | E, Tp.Tuple<[A, B]>>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */
export declare const zip_: <R, E, A, R1, E1, B>(self: Sync<R, E, A>, that: Sync<R1, E1, B>) => Sync<R & R1, E | E1, Tp.Tuple<[A, B]>>;
/**
 * Suspend a computation, useful in recursion
 */
export declare const suspend: <R, E, A>(f: () => Sync<R, E, A>) => Sync<R, E, A>;
/**
 * Lift a sync (non failable) computation
 */
export declare const succeedWith: <A>(f: () => A) => Sync<unknown, never, A>;
/**
 * Lift a sync (non failable) computation
 */
export declare const tryCatch: <E>(onThrow: (u: unknown) => E) => <A>(f: () => A) => Sync<unknown, E, A>;
/**
 * Runs this computation returning either an error of type E or a success of type A
 */
export declare const runEither: <E, A>(self: Sync<unknown, E, A>) => Either<E, A>;
/**
 * Runs this computation returning either an error of type E or a success of type A
 */
export declare const runEitherEnv: <R>(r: R) => <E, A>(self: Sync<R, E, A>) => Either<E, A>;
/**
 * Runs this non failable computation returning a success of type A
 */
export declare const run: <A>(self: Sync<unknown, never, A>) => A;
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */
export declare function unionFn<ARGS extends any[], Ret extends Sync<any, any, any>>(_: (...args: ARGS) => Ret): (...args: ARGS) => Sync<_R<Ret>, _E<Ret>, _A<Ret>>;
/**
 * Compact the union
 *
 * @ets_optimize identity
 */
export declare function union<Ret extends Sync<any, any, any>>(_: Ret): Sync<_R<Ret>, _E<Ret>, _A<Ret>>;
//# sourceMappingURL=core.d.ts.map