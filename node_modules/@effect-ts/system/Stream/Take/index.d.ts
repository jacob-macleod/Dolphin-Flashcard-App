import "../../Operator/index.js";
import * as C from "../../Cause/core.js";
import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as E from "../../Exit/api.js";
import * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import type { Pull } from "../Pull/index.js";
export declare type Take<E, A> = E.Exit<O.Option<E>, A.Chunk<A>>;
export declare function chunk<A>(as: A.Chunk<A>): Take<never, A>;
export declare function halt<E>(cause: C.Cause<E>): Take<E, never>;
export declare const end: Take<never, never>;
export declare function done<E, A>(take: Take<E, A>): T.Effect<unknown, O.Option<E>, A.Chunk<A>>;
export declare function fromPull<R, E, O>(pull: Pull<R, E, O>): T.Effect<R, never, Take<E, O>>;
export declare function tap_<E, A, R, E1, X>(take: Take<E, A>, f: (as: A.Chunk<A>) => T.Effect<R, E1, X>): T.Effect<R, E1, void>;
export declare function tap<A, R, E1, X>(f: (as: A.Chunk<A>) => T.Effect<R, E1, X>): <E>(take: E.Exit<O.Option<E>, A.Chunk<A>>) => T.Effect<R, E1, void>;
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */
export declare function fold_<E, A, Z>(take: Take<E, A>, end: Z, error: (cause: C.Cause<E>) => Z, value: (chunk: A.Chunk<A>) => Z): Z;
/**
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield a value.
 */
export declare function fold<E, A, Z>(end: Z, error: (cause: C.Cause<E>) => Z, value: (chunk: A.Chunk<A>) => Z): (take: Take<E, A>) => Z;
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */
export declare function foldM_<E, A, R, E1, Z>(take: Take<E, A>, end: () => T.Effect<R, E1, Z>, error: (cause: C.Cause<E>) => T.Effect<R, E1, Z>, value: (chunk: A.Chunk<A>) => T.Effect<R, E1, Z>): T.Effect<R, E1, Z>;
/**
 * Effectful version of `Take#fold`.
 *
 * Folds over the failure cause, success value and end-of-stream marker to
 * yield an effect.
 */
export declare function foldM<E, A, R, E1, Z>(end: () => T.Effect<R, E1, Z>, error: (cause: C.Cause<E>) => T.Effect<R, E1, Z>, value: (chunk: A.Chunk<A>) => T.Effect<R, E1, Z>): (take: Take<E, A>) => T.Effect<R, E1, Z>;
export declare function map_<E, A, B>(take: Take<E, A>, f: (a: A) => B): Take<E, B>;
export declare function map<A, B>(f: (a: A) => B): <E>(take: E.Exit<O.Option<E>, A.Chunk<A>>) => E.Exit<O.Option<E>, A.Chunk<B>>;
//# sourceMappingURL=index.d.ts.map