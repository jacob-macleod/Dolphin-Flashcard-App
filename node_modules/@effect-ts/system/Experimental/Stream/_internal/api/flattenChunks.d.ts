import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as C from "../core.js";
/**
 * Submerges the chunks carried by this stream into the stream's structure, while
 * still preserving them.
 */
export declare function flattenChunks<R, E, A>(self: C.Stream<R, E, CK.Chunk<A>>): C.Stream<R, E, A>;
//# sourceMappingURL=flattenChunks.d.ts.map