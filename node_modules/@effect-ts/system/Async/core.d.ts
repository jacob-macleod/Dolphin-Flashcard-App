import * as Tp from "../Collections/Immutable/Tuple/index.js";
import { _A, _E, _R, _U } from "../Effect/commons.js";
import * as E from "../Either/index.js";
import type { Option } from "../Option/index.js";
import type * as U from "../Utils/index.js";
/**
 * `Async[R, E, A]` is a purely functional description of an async computation
 * that requires an environment `R` and may either  fail with an `E` or succeed
 * with an `A`.
 */
export interface Async<R, E, A> extends U.HasUnify {
}
export declare abstract class Async<R, E, A> {
    readonly [_U]: "Async";
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    readonly [_R]: (_: R) => void;
}
export interface UIO<A> extends Async<unknown, never, A> {
}
export interface RIO<R, A> extends Async<R, never, A> {
}
export interface IO<E, A> extends Async<unknown, E, A> {
}
/**
 * Models the state of interruption, allows for listening to interruption events & firing interruption events
 */
export declare class InterruptionState {
    private isInterrupted;
    readonly listeners: Set<() => void>;
    listen(f: () => void): () => void;
    get interrupted(): boolean;
    interrupt(): void;
}
export interface Failure<E> {
    readonly _tag: "Failure";
    e: E;
}
export interface Interrupt {
    readonly _tag: "Interrupt";
}
export interface Success<A> {
    readonly _tag: "Success";
    a: A;
}
export declare type Rejection<E> = Failure<E> | Interrupt;
export declare type Exit<E, A> = Rejection<E> | Success<A>;
export declare const failExit: <E>(e: E) => Rejection<E>;
export declare const interruptExit: Exit<never, never>;
export declare const successExit: <A>(a: A) => Exit<never, A>;
export declare class Tracer {
    private running;
    constructor();
    traced<A>(promise: () => Promise<A>): () => Promise<A>;
    wait(): Promise<Exit<any, any>[]>;
    clear(): void;
}
export declare const tracingContext: Tracer;
/**
 * Runs this computation with the specified initial state, returning either a
 * failure or the updated state and the result
 */
export declare function runPromiseExitEnv<R, E, A>(self: Async<R, E, A>, ri: R, is?: InterruptionState): Promise<Exit<E, A>>;
export declare function runPromiseExit<E, A>(self: Async<unknown, E, A>, is?: InterruptionState): Promise<Exit<E, A>>;
export declare function runPromise<E, A>(task: Async<unknown, E, A>, is?: InterruptionState): Promise<A>;
export declare function runAsync<E, A>(task: Async<unknown, E, A>, cb?: (e: Exit<E, A>) => void): () => void;
export declare function runAsyncEnv<R, E, A>(task: Async<R, E, A>, r: R, cb?: (e: Exit<E, A>) => void): () => void;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */
export declare function chain<A, R1, E1, B>(f: (a: A) => Async<R1, E1, B>): <R, E>(self: Async<R, E, A>) => Async<R & R1, E1 | E, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function chain_<R, E, A, R1, E1, B>(self: Async<R, E, A>, f: (a: A) => Async<R1, E1, B>): Async<R & R1, E | E1, B>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 *
 * @ets_data_first tap_
 */
export declare function tap<A, R1, E1, X>(f: (a: A) => Async<R1, E1, X>): <R, E>(self: Async<R, E, A>) => Async<R & R1, E1 | E, A>;
/**
 * Returns a computation that effectfully "peeks" at the success of this one.
 */
export declare function tap_<R, E, A, R1, E1, X>(self: Async<R, E, A>, f: (a: A) => Async<R1, E1, X>): Async<R & R1, E | E1, A>;
/**
 * Constructs a computation that always succeeds with the specified value.
 */
export declare function succeed<A>(a: A): Async<unknown, never, A>;
/**
 * Constructs a computation that always succeeds with the specified value,
 * passing the state through unchanged.
 */
export declare function fail<E>(a: E): Async<unknown, E, never>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */
export declare function map_<R, E, A, B>(self: Async<R, E, A>, f: (a: A) => B): Async<R, E, B>;
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): <R, E>(self: Async<R, E, A>) => Async<R, E, B>;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 */
export declare function foldM_<R, E, A, R1, E1, B, R2, E2, C>(self: Async<R, E, A>, failure: (e: E) => Async<R1, E1, B>, success: (a: A) => Async<R2, E2, C>): Async<R & R1 & R2, E1 | E2, B | C>;
/**
 * Recovers from errors by accepting one computation to execute for the case
 * of an error, and one computation to execute for the case of success.
 *
 * @ets_data_first foldM_
 */
export declare function foldM<E, A, R1, E1, B, R2, E2, C>(failure: (e: E) => Async<R1, E1, B>, success: (a: A) => Async<R2, E2, C>): <R>(self: Async<R, E, A>) => Async<R & R1 & R2, E1 | E2, B | C>;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or right function passed to `fold`.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, B, C>(failure: (e: E) => B, success: (a: A) => C): <R>(self: Async<R, E, A>) => Async<R, never, B | C>;
/**
 * Folds over the failed or successful results of this computation to yield
 * a computation that does not fail, but succeeds with the value of the left
 * or righr function passed to `fold`.
 */
export declare function fold_<R, E, A, B, C>(self: Async<R, E, A>, failure: (e: E) => B, success: (a: A) => C): Async<R, never, B | C>;
/**
 * Recovers from all errors.
 *
 * @ets_data_first catchAll_
 */
export declare function catchAll<E, R1, E1, B>(failure: (e: E) => Async<R1, E1, B>): <R, A>(self: Async<R, E, A>) => Async<R & R1, E1, B | A>;
/**
 * Recovers from all errors.
 */
export declare function catchAll_<R, E, A, R1, E1, B>(self: Async<R, E, A>, failure: (e: E) => Async<R1, E1, B>): Async<R & R1, E1, A | B>;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 *
 * @ets_data_first bimap_
 */
export declare function bimap<E, A, E1, A1>(f: (e: E) => E1, g: (a: A) => A1): <R>(self: Async<R, E, A>) => Async<R, E1, () => A1>;
/**
 * Returns a computation whose error and success channels have been mapped
 * by the specified functions, `f` and `g`.
 */
export declare function bimap_<R, E, A, E1, A1>(self: Async<R, E, A>, f: (e: E) => E1, g: (a: A) => A1): Async<R, E1, () => A1>;
/**
 * Transforms the error type of this computation with the specified
 * function.
 *
 * @ets_data_first mapError_
 */
export declare function mapError<E, E1>(f: (e: E) => E1): <R, A>(self: Async<R, E, A>) => Async<R, E1, A>;
/**
 * Transforms the error type of this computation with the specified
 * function.
 */
export declare function mapError_<R, E, A, E1>(self: Async<R, E, A>, f: (e: E) => E1): Async<R, E1, A>;
/**
 * Constructs a computation that always returns the `Unit` value, passing the
 * state through unchanged.
 */
export declare const unit: Async<unknown, never, void>;
/**
 * Transforms the initial state of this computation` with the specified
 * function.
 */
export declare function provideSome<R0, R1>(f: (s: R0) => R1): <E, A>(self: Async<R1, E, A>) => Async<R0, E, A>;
/**
 * Provides this computation with its required environment.
 *
 * @ets_data_first provideAll_
 */
export declare function provideAll<R>(r: R): <E, A>(self: Async<R, E, A>) => Async<unknown, E, A>;
/**
 * Provides this computation with its required environment.
 */
export declare function provideAll_<R, E, A>(self: Async<R, E, A>, r: R): Async<unknown, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
export declare function provide<R = unknown>(r: R): <E, A, R0 = unknown>(next: Async<R & R0, E, A>) => Async<R0, E, A>;
/**
 * Access the environment monadically
 */
export declare function accessM<R, R1, E, A>(f: (_: R) => Async<R1, E, A>): Async<R1 & R, E, A>;
/**
 * Access the environment with the function f
 */
export declare function access<R, A>(f: (_: R) => A): Async<R, never, A>;
/**
 * Access the environment
 */
export declare function environment<R>(): Async<R, never, R>;
/**
 * Returns a computation whose failure and success have been lifted into an
 * `Either`. The resulting computation cannot fail, because the failure case
 * has been exposed as part of the `Either` success case.
 */
export declare function either<R, E, A>(self: Async<R, E, A>): Async<R, never, E.Either<E, A>>;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 *
 * @ets_data_first orElseEither_
 */
export declare function orElseEither<R2, E2, A2>(that: () => Async<R2, E2, A2>): <R, E, A>(self: Async<R, E, A>) => Async<R & R2, E2, E.Either<A, A2>>;
/**
 * Executes this computation and returns its value, if it succeeds, but
 * otherwise executes the specified computation.
 */
export declare function orElseEither_<R, E, A, R2, E2, A2>(self: Async<R, E, A>, that: () => Async<R2, E2, A2>): Async<R & R2, E2, E.Either<A, A2>>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 *
 * @ets_data_first zipWith_
 */
export declare function zipWith<R1, E1, A, B, C>(that: Async<R1, E1, B>, f: (a: A, b: B) => C): <R, E>(self: Async<R, E, A>) => Async<R & R1, E1 | E, C>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both using the specified function.
 */
export declare function zipWith_<R, E, A, R1, E1, B, C>(self: Async<R, E, A>, that: Async<R1, E1, B>, f: (a: A, b: B) => C): Async<R & R1, E | E1, C>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 *
 * @ets_data_first zip_
 */
export declare function zip<R1, E1, B>(that: Async<R1, E1, B>): <R, E, A>(self: Async<R, E, A>) => Async<R & R1, E1 | E, Tp.Tuple<[a: A, b: B]>>;
/**
 * Combines this computation with the specified computation, passing the
 * updated state from this computation to that computation and combining the
 * results of both into a tuple.
 */
export declare function zip_<R, E, A, R1, E1, B>(self: Async<R, E, A>, that: Async<R1, E1, B>): Async<R & R1, E | E1, Tp.Tuple<[a: A, b: B]>>;
/**
 * Suspend a computation, useful in recursion
 */
export declare function suspend<R, E, A>(f: () => Async<R, E, A>): Async<R, E, A>;
/**
 * Lift a sync (non failable) computation
 */
export declare function succeedWith<A>(f: () => A): Async<unknown, never, A>;
/**
 * Lift a sync (non failable) computation
 */
export declare function tryCatch<E, A>(f: () => A, onThrow: (u: unknown) => E): Async<unknown, E, A>;
export declare function promise<E, A>(promise: (onInterrupt: (f: () => void) => void) => Promise<A>, onError: (u: unknown) => E): Async<unknown, E, A>;
export declare function unfailable<A>(promise: (onInterrupt: (f: () => void) => void) => Promise<A>): Async<unknown, never, A>;
export declare function done<E, A>(exit: Exit<E, A>): Async<unknown, E, A>;
export declare function tapError<EA, B, EB, R>(f: (_: EA) => Async<R, EB, B>): <R1, A>(self: Async<R1, EA, A>) => Async<R1 & R, EA | EB, A>;
export declare function sleep(ms: number): Async<unknown, never, unknown>;
export declare function delay(ms: number): <R, E, A>(self: Async<R, E, A>) => Async<R, E, A>;
export declare function fromEither<E, A>(e: E.Either<E, A>): Async<unknown, never, A> | Async<unknown, E, never>;
/**
 * Compact the union produced by the result of f
 *
 * @ets_optimize identity
 */
export declare function unionFn<ARGS extends any[], Ret extends Async<any, any, any>>(_: (...args: ARGS) => Ret): (...args: ARGS) => Async<U._R<Ret>, U._E<Ret>, U._A<Ret>>;
/**
 * Compact the union
 *
 * @ets_optimize identity
 */
export declare function union<Ret extends Async<any, any, any>>(_: Ret): Async<U._R<Ret>, U._E<Ret>, U._A<Ret>>;
/**
 * Get the A from an option
 */
export default function tryCatchOption_<A, E>(ma: Option<A>, onNone: () => E): Async<unknown, never, A> | Async<unknown, E, never>;
/**
 * Get the A from an option
 *
 * @ets_data_first tryCatchOption_
 */
export declare function tryCatchOption<A, E>(onNone: () => E): (ma: Option<A>) => Async<unknown, never, A> | Async<unknown, E, never>;
//# sourceMappingURL=core.d.ts.map