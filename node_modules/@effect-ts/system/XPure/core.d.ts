import * as Chunk from "../Collections/Immutable/Chunk/core.js";
import * as Tp from "../Collections/Immutable/Tuple/index.js";
import { _A, _E, _R, _S1, _S2, _U, _W } from "../Effect/commons.js";
import type { EffectURI } from "../Effect/effect.js";
import * as E from "../Either/core.js";
import type { HasUnify } from "../Utils/index.js";
/**
 * `XPure[W, S1, S2, R, E, A]` is a purely functional description of a
 * computation that requires an environment `R` and an initial state `S1` and
 * may either fail with an `E` or succeed with an updated state `S2` and an `A`
 * along with in either case a log with entries of type `W`. Because of its
 * polymorphism `ZPure` can be used to model a variety of effects including
 * context, state, failure, and logging.
 */
export interface XPure<W, S1, S2, R, E, A> extends HasUnify {
    readonly _tag: "XPure";
    readonly [_S1]: (_: S1) => void;
    readonly [_S2]: () => S2;
    readonly [_U]: EffectURI;
    readonly [_W]: () => W;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    readonly [_R]: (_: R) => void;
}
export declare abstract class XPureBase<W, S1, S2, R, E, A> implements XPure<W, S1, S2, R, E, A> {
    readonly _tag = "XPure";
    readonly [_S1]: (_: S1) => void;
    readonly [_S2]: () => S2;
    readonly [_U]: EffectURI;
    readonly [_W]: () => W;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    readonly [_R]: (_: R) => void;
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function chain<W, A, S2, S3, R1, E1, B>(f: (a: A) => XPure<W, S2, S3, R1, E1, B>): <W1, S1, R, E>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W | W1, S1, S3, R & R1, E1 | E, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function chain_<W, W1, S1, R, E, A, S2, S3, R1, E1, B>(self: XPure<W, S1, S2, R, E, A>, f: (a: A) => XPure<W1, S2, S3, R1, E1, B>): XPure<W | W1, S1, S3, R & R1, E | E1, B>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare function tap<W, A, S2, S3, R1, E1, X>(f: (a: A) => XPure<W, S2, S3, R1, E1, X>): <W1, S1, R, E>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W | W1, S1, S3, R & R1, E1 | E, A>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare function tap_<W, W1, S1, R, E, A, S2, S3, R1, E1, X>(self: XPure<W, S1, S2, R, E, A>, f: (a: A) => XPure<W1, S2, S3, R1, E1, X>): XPure<W | W1, S1, S3, R & R1, E | E1, A>;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */
export declare function succeed<S, A>(a: A): XPure<never, S, S, unknown, never, A>;
/**
 * Constructs a computation that logs w.
 */
export declare function log<S, W>(w: W): XPure<W, S, S, unknown, never, never>;
/**
 * Constructs a computation that logs w.
 */
export declare function logWith<S, W>(f: () => W): XPure<W, S, S, unknown, never, never>;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */
export declare function fail<E>(a: E): XPure<never, unknown, never, unknown, E, never>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function map_<W, S1, R, E, A, S2, B>(self: XPure<W, S1, S2, R, E, A>, f: (a: A) => B): XPure<W, S1, S2, R, E, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function map<A, B>(f: (a: A) => B): <W, S1, S2, R, E>(self: XPure<W, S1, S2, R, E, A>) => XPure<W, S1, S2, R, E, B>;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */
export declare function foldM_<W, W1, W2, S1, S2, S3, S4, S5, R, E, A, R1, E1, B, R2, E2, C>(self: XPure<W, S1, S2, R, E, A>, failure: (e: E) => XPure<W1, S5, S3, R1, E1, B>, success: (a: A) => XPure<W2, S2, S4, R2, E2, C>): XPure<W | W1 | W2, S1 & S5, S3 | S4, R & R1 & R2, E1 | E2, B | C>;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */
export declare function foldM<W2, W3, S5, S2, E, A, S3, R1, E1, B, S4, R2, E2, C>(failure: (e: E) => XPure<W2, S5, S3, R1, E1, B>, success: (a: A) => XPure<W3, S2, S4, R2, E2, C>): <W1, S1, R>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W2 | W3 | W1, S1 & S5, S3 | S4, R & R1 & R2, E1 | E2, B | C>;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */
export declare function fold<E, A, B, C>(failure: (e: E) => B, success: (a: A) => C): <W, S1, S2, R>(self: XPure<W, S1, S2, R, E, A>) => XPure<W, S1 & S2, S1 | S2, R, never, B | C>;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */
export declare function fold_<W, S1, S2, R, E, A, B, C>(self: XPure<W, S1, S2, R, E, A>, failure: (e: E) => B, success: (a: A) => C): XPure<W, S1 & S2, S1 | S2, R, never, B | C>;
/**
 * Recovers from all errors.
 */
export declare function catchAll<W, S1, E, S3, R1, E1, B>(failure: (e: E) => XPure<W, S1, S3, R1, E1, B>): <W1, S2, R, A>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W | W1, S1, S3 | S2, R & R1, E1, B | A>;
/**
 * Recovers from all errors.
 */
export declare function catchAll_<W, W1, S1, S2, R, E, A, S3, R1, E1, B>(self: XPure<W, S1, S2, R, E, A>, failure: (e: E) => XPure<W1, S1, S3, R1, E1, B>): XPure<W | W1, S1, S2 | S3, R & R1, E1, A | B>;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */
export declare function bimap<E, A, E1, A1>(f: (e: E) => E1, g: (a: A) => A1): <W, S1, S2, R>(self: XPure<W, S1, S2, R, E, A>) => XPure<W, S1, S2, R, E1, A1>;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */
export declare function bimap_<W, S1, S2, R, E, A, E1, A1>(self: XPure<W, S1, S2, R, E, A>, f: (e: E) => E1, g: (a: A) => A1): XPure<W, S1, S2, R, E1, A1>;
/**
 * Transforms the error type of this computation with the specified
 * function.
 */
export declare function mapError<E, E1>(f: (e: E) => E1): <W, S1, S2, R, A>(self: XPure<W, S1, S2, R, E, A>) => XPure<W, S1, S2, R, E1, A>;
/**
 * Transforms the error type of this computation with the specified
 * function.
 */
export declare function mapError_<W, S1, S2, R, E, A, E1>(self: XPure<W, S1, S2, R, E, A>, f: (e: E) => E1): XPure<W, S1, S2, R, E1, A>;
/**
 * Constructs a computation from the specified modify function.
 */
export declare function modify<S1, S2, A>(f: (s: S1) => Tp.Tuple<[S2, A]>): XPure<never, S1, S2, unknown, never, A>;
/**
 * Constructs a computation from the specified modify function.
 */
export declare function set<S>(s: S): XPure<never, unknown, S, unknown, never, void>;
/**
 * Constructs a computation from the specified update function.
 */
export declare function update<W, S1, S2>(f: (s: S1) => S2): XPure<W, S1, S2, unknown, never, void>;
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */
export declare const unit: XPure<never, unknown, unknown, unknown, never, void>;
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */
export declare function contramapInput<S0, S1>(f: (s: S0) => S1): <W, S2, R, E, A>(self: XPure<W, S1, S2, R, E, A>) => XPure<unknown, S0, S2, R, E, A>;
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */
export declare function provideSome<R0, R1>(f: (s: R0) => R1): <W, S1, S2, E, A>(self: XPure<W, S1, S2, R1, E, A>) => XPure<W, S1, S2, R0, E, A>;
/**
 * Provides this computation with its required environment.
 */
export declare function provideAll<R>(r: R): <W, S1, S2, E, A>(self: XPure<W, S1, S2, R, E, A>) => XPure<W, S1, S2, unknown, E, A>;
/**
 * Provides this computation with its required environment.
 */
export declare function provideAll_<W, S1, S2, R, E, A>(self: XPure<W, S1, S2, R, E, A>, r: R): XPure<W, S1, S2, unknown, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
export declare function provide<R>(r: R): <W, SI, SO, E, A, R0>(next: XPure<W, SI, SO, R & R0, E, A>) => XPure<W, SI, SO, R0, E, A>;
/**
 * Get the state monadically
 */
export declare function getM<W, R, S1, S2, R1, E, A>(f: (_: S1) => XPure<W, S1, S2, R1, E, A>): XPure<W, S1, S2, R1 & R, E, A>;
/**
 * Get the state with the function f
 */
export declare function get<A, S>(f: (_: S) => A): XPure<never, S, S, unknown, never, A>;
/**
 * Access the environment monadically
 */
export declare function accessM<W, R, S1, S2, R1, E, A>(f: (_: R) => XPure<W, S1, S2, R1, E, A>): XPure<W, S1, S2, R1 & R, E, A>;
/**
 * Access the environment with the function f
 */
export declare function access<R, A, S>(f: (_: R) => A): XPure<never, S, S, R, never, A>;
/**
 * Access the environment
 */
export declare function environment<R>(): XPure<never, unknown, unknown, R, never, R>;
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */
export declare function either<W, S1, S2, R, E, A>(self: XPure<W, S1, S2, R, E, A>): XPure<W, S1 & S2, S1 | S2, R, never, E.Either<E, A>>;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */
export declare function orElseEither<W, S3, S4, R2, E2, A2>(that: () => XPure<W, S3, S4, R2, E2, A2>): <W1, S1, S2, R, E, A>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W | W1, S3 & S1, S4 | S2, R & R2, E2, E.Either<A, A2>>;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */
export declare function orElseEither_<W, W1, S1, S2, R, E, A, S3, S4, R2, E2, A2>(self: XPure<W, S1, S2, R, E, A>, that: () => XPure<W1, S3, S4, R2, E2, A2>): XPure<W | W1, S3 & S1, S4 | S2, R & R2, E2, E.Either<A, A2>>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */
export declare function zipWith<W, S2, S3, R1, E1, A, B, C>(that: XPure<W, S2, S3, R1, E1, B>, f: (a: A, b: B) => C): <W1, S1, R, E>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W | W1, S1, S3, R & R1, E1 | E, C>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */
export declare function zipWith_<W, W1, S1, S2, R, E, A, S3, R1, E1, B, C>(self: XPure<W, S1, S2, R, E, A>, that: XPure<W1, S2, S3, R1, E1, B>, f: (a: A, b: B) => C): XPure<W | W1, S1, S3, R & R1, E | E1, C>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */
export declare function zip<W, S2, S3, R1, E1, B>(that: XPure<W, S2, S3, R1, E1, B>): <W1, S1, R, E, A>(self: XPure<W1, S1, S2, R, E, A>) => XPure<W | W1, S1, S3, R & R1, E1 | E, Tp.Tuple<[a: A, b: B]>>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */
export declare function zip_<W, W1, S1, S2, R, E, A, S3, R1, E1, B>(self: XPure<W, S1, S2, R, E, A>, that: XPure<W1, S2, S3, R1, E1, B>): XPure<W | W1, S1, S3, R & R1, E | E1, Tp.Tuple<[a: A, b: B]>>;
/**
 * Suspend a computation, useful in recursion
 */
export declare function suspend<W, S1, S2, R, E, A>(f: () => XPure<W, S1, S2, R, E, A>): XPure<W, S1, S2, R, E, A>;
/**
 * Lift a sync (non failable) computation
 */
export declare function succeedWith<W, A>(f: () => A): XPure<never, W, W, unknown, never, A>;
/**
 * Lift a sync (non failable) computation
 */
export declare function tryCatch<E>(onThrow: (u: unknown) => E): <A>(f: () => A) => XPure<never, unknown, unknown, unknown, E, A>;
/**
 * Runs this computation with the specified initial state, returning both the
 * log and either all the failures that occurred or the updated state and the
 * result.
 */
export declare function runAll_<W, S1, S2, E, A>(self: XPure<W, S1, S2, unknown, E, A>, s: S1): Tp.Tuple<[Chunk.Chunk<W>, E.Either<E, Tp.Tuple<[S2, A]>>]>;
/**
 * Runs this computation with the specified initial state, returning either a
 * failure or the updated state and the result
 */
export declare function runAll<S1>(s: S1): <W, S2, E, A>(self: XPure<W, S1, S2, unknown, E, A>) => Tp.Tuple<[Chunk.Chunk<W>, E.Either<E, Tp.Tuple<[S2, A]>>]>;
/**
 * Runs this computation to produce its result.
 */
export declare function run<W, S2, A>(self: XPure<W, unknown, S2, unknown, never, A>): A;
/**
 * Runs this computation with the specified initial state, returning both
 * the updated state and the result.
 */
export declare function runState_<W, S1, S2, A>(self: XPure<W, S1, S2, unknown, never, A>, s: S1): Tp.Tuple<[S2, A]>;
/**
 * Runs this computation with the specified initial state, returning both
 * the updated state and the result.
 *
 * @ets_data_first runState_
 */
export declare function runState<S1>(s: S1): <W, S2, A>(self: XPure<W, S1, S2, unknown, never, A>) => Tp.Tuple<[S2, A]>;
/**
 * Runs this computation to produce its result or the first failure to
 * occur.
 */
export declare function runEither<W, S2, E, A>(self: XPure<W, unknown, S2, unknown, E, A>): E.Either<E, A>;
/**
 * Runs this computation to produce its result and the log.
 */
export declare function runLog<W, S2, E, A>(self: XPure<W, unknown, S2, unknown, E, A>): Tp.Tuple<[Chunk.Chunk<W>, A]>;
/**
 * Runs this computation with the specified initial state, returning the
 * result and discarding the updated state.
 */
export declare function runResult_<W, S1, S2, A>(self: XPure<W, S1, S2, unknown, never, A>, s: S1): A;
/**
 * Runs this computation with the specified initial state, returning the
 * result and discarding the updated state.
 */
export declare function runResult<S1>(s: S1): <W, S2, A>(self: XPure<W, S1, S2, unknown, never, A>) => A;
//# sourceMappingURL=core.d.ts.map