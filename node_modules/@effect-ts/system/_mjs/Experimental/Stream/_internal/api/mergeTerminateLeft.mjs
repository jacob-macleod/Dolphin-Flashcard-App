import * as Merge from "./merge.mjs";
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */

export function mergeTerminateLeft_(self, that) {
  return Merge.merge_(self, that, "Left");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 *
 * @ets_data_first mergeTerminateLeft_
 */

export function mergeTerminateLeft(that) {
  return self => mergeTerminateLeft_(self, that);
}
//# sourceMappingURL=mergeTerminateLeft.mjs.map