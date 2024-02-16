import * as MergeAll from "./mergeAll.mjs";
/**
 * Like `mergeAll`, but runs all streams concurrently.
 */

export function mergeAllUnbounded(outputBuffer = 16) {
  return (...streams) => MergeAll.mergeAll(Number.MAX_SAFE_INTEGER, outputBuffer)(...streams);
}
//# sourceMappingURL=mergeAllUnbounded.mjs.map