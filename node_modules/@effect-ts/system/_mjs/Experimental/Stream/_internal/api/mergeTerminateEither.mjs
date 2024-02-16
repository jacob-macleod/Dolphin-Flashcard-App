import * as Merge from "./merge.mjs";
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */

export function mergeTerminateEither_(self, that) {
  return Merge.merge_(self, that, "Either");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 *
 * @ets_data_first mergeTerminateEither_
 */

export function mergeTerminateEither(that) {
  return self => mergeTerminateEither_(self, that);
}
//# sourceMappingURL=mergeTerminateEither.mjs.map