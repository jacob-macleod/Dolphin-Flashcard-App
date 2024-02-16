import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type { Stream } from "./definitions.js";
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */
export declare function grouped_<R, E, O>(self: Stream<R, E, O>, chunkSize: number): Stream<R, E, A.Chunk<O>>;
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */
export declare function grouped(chunkSize: number): <R, E, O>(self: Stream<R, E, O>) => Stream<R, E, A.Chunk<O>>;
//# sourceMappingURL=grouped.d.ts.map