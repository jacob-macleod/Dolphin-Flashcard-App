// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Performs a filter and map in a single step.
 */

export function collect_(self, f) {
  return mapChunks_(self, A.collect(f));
}
/**
 * Performs a filter and map in a single step.
 */

export function collect(f) {
  return self => collect_(self, f);
}
//# sourceMappingURL=collect.mjs.map