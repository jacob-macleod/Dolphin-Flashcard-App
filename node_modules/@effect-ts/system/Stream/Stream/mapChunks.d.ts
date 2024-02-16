import type * as A from "../../Collections/Immutable/Chunk/index.js";
import type { Stream } from "./definitions.js";
/**
 * Transforms the chunks emitted by this stream.
 */
export declare function mapChunks_<R, E, O, O2>(self: Stream<R, E, O>, f: (_: A.Chunk<O>) => A.Chunk<O2>): Stream<R, E, O2>;
/**
 * Transforms the chunks emitted by this stream.
 */
export declare function mapChunks<O, O2>(f: (_: A.Chunk<O>) => A.Chunk<O2>): <R, E>(self: Stream<R, E, O>) => Stream<R, E, O2>;
//# sourceMappingURL=mapChunks.d.ts.map