// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as MapChunks from "./mapChunks.mjs";
/**
 * Performs a filter and map in a single step.
 */

export function collect_(self, f) {
  return MapChunks.mapChunks_(self, CK.collect(f));
}
/**
 * Performs a filter and map in a single step.
 *
 * @ets_data_first collect_
 */

export function collect(f) {
  return self => collect_(self, f);
}
//# sourceMappingURL=collect.mjs.map