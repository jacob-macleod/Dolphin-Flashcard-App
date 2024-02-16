import { flattenPar_ } from "./flattenPar.mjs";
import { fromIterable } from "./fromIterable.mjs";
/**
 * Merges a variable list of streams in a non-deterministic fashion.
 * Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` chunks may be buffered by this operator.
 */

export function mergeAll(n, outputBuffer = 16) {
  return (...streams) => flattenPar_(fromIterable(streams), n, outputBuffer);
}
//# sourceMappingURL=mergeAll.mjs.map