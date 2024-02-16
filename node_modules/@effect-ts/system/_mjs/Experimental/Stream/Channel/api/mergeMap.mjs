import * as MapOut from "./mapOut.mjs";
import * as MergeAll from "./mergeAll.mjs";
export function mergeMap_(self, n, f, bufferSize = 16, mergeStrategy = "BackPressure") {
  return MergeAll.mergeAll_(MapOut.mapOut_(self, f), n, bufferSize, mergeStrategy);
}
/**
 * @ets_data_first mergeMap_
 */

export function mergeMap(n, f, bufferSize = 16, mergeStrategy = "BackPressure") {
  return self => mergeMap_(self, n, f, bufferSize, mergeStrategy);
}
//# sourceMappingURL=mergeMap.mjs.map