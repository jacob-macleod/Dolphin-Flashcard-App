import * as A from "../../Collections/Immutable/Chunk/index.js";
import type { Stream } from "./definitions.js";
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 */
export declare function mapConcatChunk_<R, E, O, O2>(self: Stream<R, E, O>, f: (_: O) => A.Chunk<O2>): Stream<R, E, O2>;
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 */
export declare function mapConcatChunk<O, O2>(f: (_: O) => A.Chunk<O2>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O2>;
//# sourceMappingURL=mapConcatChunk.d.ts.map