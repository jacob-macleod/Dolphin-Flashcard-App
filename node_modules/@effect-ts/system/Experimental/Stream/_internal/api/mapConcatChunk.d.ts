import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as C from "../core.js";
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 */
export declare function mapConcatChunk_<R, E, A, A1>(self: C.Stream<R, E, A>, f: (a: A) => CK.Chunk<A1>): C.Stream<R, E, A1>;
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 *
 * @ets_data_first mapConcatChunk_
 */
export declare function mapConcatChunk<A, A1>(f: (a: A) => CK.Chunk<A1>): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, A1>;
//# sourceMappingURL=mapConcatChunk.d.ts.map