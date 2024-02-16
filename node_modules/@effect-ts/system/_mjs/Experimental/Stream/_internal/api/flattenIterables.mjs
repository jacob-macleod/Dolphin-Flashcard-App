// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as FlattenChunks from "./flattenChunks.mjs";
import * as Map from "./map.mjs";
/**
 * Submerges the iterables carried by this stream into the stream's structure, while
 * still preserving them.
 */

export function flattenIterables(self) {
  return FlattenChunks.flattenChunks(Map.map_(self, a => CK.from(a)));
}
//# sourceMappingURL=flattenIterables.mjs.map