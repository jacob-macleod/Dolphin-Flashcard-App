import * as MergeAllWith from "./mergeAllWith.mjs";
export function mergeAll_(channels, n, bufferSize = 16, mergeStrategy = "BackPressure") {
  return MergeAllWith.mergeAllWith_(channels, n, (_, __) => void 0, bufferSize, mergeStrategy);
}
/**
 * @ets_data_first mergeAll_
 */

export function mergeAll(n, bufferSize = 16, mergeStrategy = "BackPressure") {
  return channels => mergeAll_(channels, n, bufferSize, mergeStrategy);
}
//# sourceMappingURL=mergeAll.mjs.map