import type * as Chunk from "../../Collections/Immutable/Chunk/index.js";
import { Stream } from "./definitions.js";
/**
 * Submerges the chunks carried by this stream into the stream's structure, while
 * still preserving them.
 */
export declare function flattenChunks<R, E, O>(self: Stream<R, E, Chunk.Chunk<O>>): Stream<R, E, O>;
//# sourceMappingURL=flattenChunks.d.ts.map