import * as Merge from "./merge.mjs";
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */

export function mergeTerminateRight_(self, that) {
  return Merge.merge_(self, that, "Right");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 * @ets_data_first mergeTerminateRight_
 */

export function mergeTerminateRight(that) {
  return self => mergeTerminateRight_(self, that);
}
//# sourceMappingURL=mergeTerminateRight.mjs.map