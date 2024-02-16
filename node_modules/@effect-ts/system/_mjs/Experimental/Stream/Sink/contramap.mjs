// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as ContramapChunks from "./contramapChunks.mjs";
/**
 * Transforms this sink's input elements.
 */

export function contramap_(self, f) {
  return ContramapChunks.contramapChunks_(self, CK.map(f));
}
/**
 * Transforms this sink's input elements.
 *
 * @ets_data_first contramap_
 */

export function contramap(f) {
  return self => contramap_(self, f);
}
//# sourceMappingURL=contramap.mjs.map