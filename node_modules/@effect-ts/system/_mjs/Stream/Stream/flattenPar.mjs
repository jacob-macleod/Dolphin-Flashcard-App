// ets_tracing: off
import { chainPar } from "./chainPar.mjs";
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */

export function flattenPar_(self, n, outputBuffer = 16) {
  return chainPar(n, outputBuffer)(x => x)(self);
}
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */

export function flattenPar(n, outputBuffer = 16) {
  return self => flattenPar_(self, n, outputBuffer);
}
//# sourceMappingURL=flattenPar.mjs.map