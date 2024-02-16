// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as ScanReduceEffect from "./scanReduceEffect.mjs";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 */

export function scanReduce_(self, f) {
  return ScanReduceEffect.scanReduceEffect_(self, (curr, next) => T.succeed(f(curr, next)));
}
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 *
 * @ets_data_first scanReduce_
 */

export function scanReduce(f) {
  return self => scanReduce_(self, f);
}
//# sourceMappingURL=scanReduce.mjs.map