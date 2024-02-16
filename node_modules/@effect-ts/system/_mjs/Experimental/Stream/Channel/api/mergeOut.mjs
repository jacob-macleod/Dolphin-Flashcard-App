import * as MapOut from "./mapOut.mjs";
import * as MergeAll from "./mergeAll.mjs";
export function mergeOut_(self, n) {
  return MergeAll.mergeAll_(MapOut.mapOut_(self, x => x), n);
}
/**
 * @ets_data_first mergeOut_
 */

export function mergeOut(n) {
  return self => mergeOut_(self, n);
}
//# sourceMappingURL=mergeOut.mjs.map