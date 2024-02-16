// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { flattenChunks } from "./flattenChunks.mjs";
import { map_ } from "./map.mjs";
/**
 * Submerges the iterables carried by this stream into the stream's structure, while
 * still preserving them.
 */

export function flattenIterables(self) {
  return flattenChunks(map_(self, A.from));
}
//# sourceMappingURL=flattenIterables.mjs.map