// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Performs a filter and map in a single step.
 */

export function filterMap_(self, pf) {
  return mapChunks_(self, A.collect(pf));
}
/**
 * Performs a filter and map in a single step.
 */

export function filterMap(pf) {
  return self => filterMap_(self, pf);
}
//# sourceMappingURL=filterMap.mjs.map