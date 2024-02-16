import * as C from "../../../Cause/index.js";
import * as A from "../../../Collections/Immutable/Chunk/index.js";
import { _A, _E } from "../../../Effect/commons.js";
import * as T from "../../../Effect/index.js";
import * as Ex from "../../../Exit/index.js";
import * as O from "../../../Option/index.js";
import type { Pull } from "../Pull/index.js";
/**
 * A `Take<E, A>` represents a single `take` from a queue modeling a stream of
 * values. A `Take` may be a failure cause `Cause<E>`, an chunk value `A`
 * or an end-of-stream marker.
 */
export declare class Take<E, A> {
    readonly exit: Ex.Exit<O.Option<E>, A.Chunk<A>>;
    readonly [_E]: () => E;
    readonly [_A]: () => A;
    constructor(exit: Ex.Exit<O.Option<E>, A.Chunk<A>>);
}
/**
 * Transforms `Take[E, A]` to `Effect[R, E, B]`.
 */
export declare function done<E, A>(self: Take<E, A>): T.IO<O.Option<E>, A.Chunk<A>>;
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */
export declare function fold_<E, A, Z>(self: Take<E, A>, end: Z, error: (cause: C.Cause<E>) => Z, value: (chunk: A.Chunk<A>) => Z): Z;
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 *
 * @ets_data_first fold_
 */
export declare function fold<E, A, Z>(end: Z, error: (cause: C.Cause<E>) => Z, value: (chunk: A.Chunk<A>) => Z): (self: Take<E, A>) => Z;
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */
export declare function foldEffect_<R, R1, R2, E, E1, E2, E3, A, Z>(self: Take<E, A>, end: T.Effect<R, E1, Z>, error: (cause: C.Cause<E>) => T.Effect<R1, E2, Z>, value: (chunk: A.Chunk<A>) => T.Effect<R2, E3, Z>): T.Effect<R & R1 & R2, E1 | E2 | E3, Z>;
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 *
 * @ets_data_first foldEffect_
 */
export declare function foldEffect<R, R1, R2, E, E1, E2, E3, A, Z>(end: T.Effect<R, E1, Z>, error: (cause: C.Cause<E>) => T.Effect<R1, E2, Z>, value: (chunk: A.Chunk<A>) => T.Effect<R2, E3, Z>): (self: Take<E, A>) => T.Effect<R & R1 & R2, E1 | E2 | E3, Z>;
/**
 * Checks if this `take` is done (`Take.end`).
 */
export declare function isDone<E, A>(self: Take<E, A>): boolean;
/**
 * Checks if this `take` is a failure.
 */
export declare function isFailure<E, A>(self: Take<E, A>): boolean;
/**
 * Checks if this `take` is a success.
 */
export declare function isSuccess<E, A>(self: Take<E, A>): boolean;
/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 */
export declare function map_<E, A, B>(self: Take<E, A>, f: (a: A) => B): Take<E, B>;
/**
 * Transforms `Take<E, A>` to `Take<E, B>` by applying function `f`.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B): <E>(self: Take<E, A>) => Take<E, B>;
/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 */
export declare function tap_<R, E, E1, A>(self: Take<E, A>, f: (chunk: A.Chunk<A>) => T.Effect<R, E1, any>): T.Effect<R, E1, void>;
/**
 * Returns an effect that effectfully "peeks" at the success of this take.
 *
 * @ets_data_first tap_
 */
export declare function tap<R, E1, A>(f: (chunk: A.Chunk<A>) => T.Effect<R, E1, any>): <E>(self: Take<E, A>) => T.Effect<R, E1, void>;
/**
 * Creates a `Take<never, A>` with a singleton chunk.
 */
export declare function single<A>(a: A): Take<never, A>;
/**
 * Creates a `Take[Nothing, A]` with the specified chunk.
 */
export declare function chunk<A>(as: A.Chunk<A>): Take<never, A>;
/**
 * Creates a failing `Take<E, unknown>` with the specified failure.
 */
export declare function fail<E>(e: E): Take<E, never>;
/**
 * Creates a failing `Take[E, Nothing]` with the specified cause.
 */
export declare function failCause<E>(c: C.Cause<E>): Take<E, never>;
/**
 * Creates an effect from `Effect<R, E,A>` that does not fail, but succeeds with the `Take<E, A>`.
 * Error from stream when pulling is converted to `Take.halt`. Creates a singleton chunk.
 */
export declare function fromEffect<R, E, A>(effect: T.Effect<R, E, A>): T.RIO<R, Take<E, A>>;
/**
 * Creates effect from `Pull<R, E, A>` that does not fail, but succeeds with the `Take<E, A>`.
 * Error from stream when pulling is converted to `Take.halt`, end of stream to `Take.end`.
 */
export declare function fromPull<R, E, A>(pull: Pull<R, E, A>): T.RIO<R, Take<E, A>>;
/**
 * Creates a failing `Take<E, never>` with the specified cause.
 */
export declare function halt<E>(c: C.Cause<E>): Take<E, never>;
/**
 * Creates a failing `Take<never, never>` with the specified throwable.
 */
export declare function die<E>(e: E): Take<never, never>;
/**
 * Creates a failing `Take<never, never>` with the specified error message.
 */
export declare function dieMessage(msg: string): Take<never, never>;
/**
 * Creates a `Take<E, A>` from `Exit<E, A>`.
 */
export declare function fromExit<E, A>(exit: Ex.Exit<E, A>): Take<E, A>;
/**
 * End-of-stream marker
 */
export declare const end: Take<never, never>;
//# sourceMappingURL=index.d.ts.map