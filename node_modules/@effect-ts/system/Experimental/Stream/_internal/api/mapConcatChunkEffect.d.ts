import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as T from "../../../../Effect/index.js";
import type * as C from "../core.js";
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */
export declare function mapConcatChunkEffect_<R, R1, E, E1, A, A1>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, CK.Chunk<A1>>): C.Stream<R & R1, E | E1, A1>;
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 *
 * @ets_data_first mapConcatChunkEffect_
 */
export declare function mapConcatChunkEffect<R1, E1, A, A1>(f: (a: A) => T.Effect<R1, E1, CK.Chunk<A1>>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R & R1, E1 | E, A1>;
//# sourceMappingURL=mapConcatChunkEffect.d.ts.map