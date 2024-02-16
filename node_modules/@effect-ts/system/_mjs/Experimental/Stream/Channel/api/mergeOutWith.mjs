import * as MapOut from "./mapOut.mjs";
import * as MergeAllWith from "./mergeAllWith.mjs";
export function mergeOutWith_(self, n, f) {
  return MergeAllWith.mergeAllWith_(MapOut.mapOut_(self, x => x), n, f);
}
/**
 * @ets_data_first mergeOutWith_
 */

export function mergeOutWith(n, f) {
  return self => mergeOutWith_(self, n, f);
}
//# sourceMappingURL=mergeOutWith.mjs.map