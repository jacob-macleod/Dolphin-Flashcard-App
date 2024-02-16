// ets_tracing: off
import * as E from "../../../../Either/index.mjs";
import * as MergeWith from "./mergeWith.mjs";
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 */

export function mergeEither_(self, that) {
  return MergeWith.mergeWith(self, that, E.left, E.right);
}
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 *
 * @ets_data_first mergeEither_
 */

export function mergeEither(that) {
  return self => mergeEither_(self, that);
}
//# sourceMappingURL=mergeEither.mjs.map