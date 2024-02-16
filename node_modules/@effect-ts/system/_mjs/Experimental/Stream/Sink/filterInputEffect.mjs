// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as ContramapChunksEffect from "./contramapChunksEffect.mjs";
export function filterInputEffect_(self, p) {
  return ContramapChunksEffect.contramapChunksEffect_(self, CK.filterEffect(p));
}
/**
 * @ets_data_first filterInputEffect_
 */

export function filterInputEffect(p) {
  return self => filterInputEffect_(self, p);
}
//# sourceMappingURL=filterInputEffect.mjs.map