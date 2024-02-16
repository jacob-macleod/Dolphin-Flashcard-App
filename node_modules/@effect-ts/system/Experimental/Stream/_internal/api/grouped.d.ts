import type * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import type * as C from "../core.js";
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */
export declare function grouped_<R, E, A>(self: C.Stream<R, E, A>, chunkSize: number): C.Stream<R, E, CK.Chunk<A>>;
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 *
 * @ets_data_first grouped_
 */
export declare function grouped(chunkSize: number): <R, E, A>(self: C.Stream<R, E, A>) => C.Stream<R, E, CK.Chunk<A>>;
//# sourceMappingURL=grouped.d.ts.map