// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { scanReduceM_ } from "./scanReduceM.mjs";
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 */

export function scanReduce_(self, f) {
  return scanReduceM_(self, (curr, next) => T.succeed(f(curr, next)));
}
/**
 * Statefully maps over the elements of this stream to produce all intermediate results.
 *
 * See also `Stream#scan`.
 */

export function scanReduce(f) {
  return self => scanReduce_(self, f);
}
//# sourceMappingURL=scanReduce.mjs.map