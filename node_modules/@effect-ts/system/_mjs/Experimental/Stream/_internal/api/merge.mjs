// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as MergeWith from "./mergeWith.mjs";
/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 */

export function merge_(self, that, strategy = "Both") {
  return MergeWith.mergeWith(self, that, identity, identity, strategy);
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
//# sourceMappingURL=merge.mjs.map