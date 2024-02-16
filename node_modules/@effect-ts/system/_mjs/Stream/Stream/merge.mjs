// ets_tracing: off
import * as E from "../../Either/index.mjs";
import { mergeWith_ } from "./mergeWith.mjs";
/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 */

export function merge_(self, that, strategy = "Both") {
  return mergeWith_(self, that, a => a, b => b, strategy);
}
/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 *
 * @ets_data_first merge_
 */

export function merge(that, strategy = "Both") {
  return self => merge_(self, that, strategy);
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */

export function mergeTerminateEither_(self, that) {
  return merge_(self, that, "Either");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */

export function mergeTerminateEither(that) {
  return self => merge_(self, that, "Either");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */

export function mergeTerminateLeft_(self, that) {
  return merge_(self, that, "Left");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */

export function mergeTerminateLeft(that) {
  return self => merge_(self, that, "Left");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */

export function mergeTerminateRight_(self, that) {
  return merge_(self, that, "Right");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */

export function mergeTerminateRight(that) {
  return self => merge_(self, that, "Right");
}
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 */

export function mergeEither_(self, that, strategy = "Both") {
  return mergeWith_(self, that, l => E.left(l), E.right, strategy);
}
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 *
 * @ets_data_first mergeEither_
 */

export function mergeEither(that, strategy = "Both") {
  return self => mergeEither_(self, that, strategy);
}
//# sourceMappingURL=merge.mjs.map