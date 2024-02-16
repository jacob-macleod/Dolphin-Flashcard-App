import "../../Operator/index.js";
import type { Cause } from "../../Cause/index.js";
import * as A from "../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as E from "../../Either/index.js";
import type * as O from "../../Option/index.js";
import * as T from "../_internal/effect.js";
import * as M from "../_internal/managed.js";
export interface Push<R, E, I, L, Z> {
    (_: O.Option<A.Chunk<I>>): T.Effect<R, Tp.Tuple<[E.Either<E, Z>, A.Chunk<L>]>, void>;
}
export declare function emit<I, Z>(z: Z, leftover: A.Chunk<I>): T.IO<Tp.Tuple<[E.Either<never, Z>, A.Chunk<I>]>, never>;
export declare function fail<E, I>(e: E, leftover: A.Chunk<I>): T.IO<Tp.Tuple<[E.Either<E, never>, A.Chunk<I>]>, never>;
export declare function halt<E>(c: Cause<E>): T.IO<Tp.Tuple<[E.Either<E, never>, A.Chunk<never>]>, never>;
export declare const more: T.UIO<void>;
/**
 * Decorates a Push with a Effect value that re-initializes it with a fresh state.
 */
export declare function restartable<R, R1, E, I, L, Z>(sink: M.Managed<R, never, Push<R1, E, I, L, Z>>): M.Managed<R, never, Tp.Tuple<[Push<R1, E, I, L, Z>, T.Effect<R, never, void>]>>;
//# sourceMappingURL=index.d.ts.map