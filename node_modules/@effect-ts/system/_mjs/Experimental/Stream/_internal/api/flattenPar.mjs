// ets_tracing: off
import { identity } from "../../../../Function/index.mjs";
import * as ChainPar from "./chainPar.mjs";
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 */

export function flattenPar_(self, n, outputBuffer = 16) {
  return ChainPar.chainPar_(self, n, identity, outputBuffer);
}
/**
 * Flattens a stream of streams into a stream by executing a non-deterministic
 * concurrent merge. Up to `n` streams may be consumed in parallel and up to
 * `outputBuffer` elements may be buffered by this operator.
 *
 * @ets_data_first flattenPar_
 */

export function flattenPar(n, outputBuffer = 16) {
  return self => flattenPar_(self, n, outputBuffer);
}
//# sourceMappingURL=flattenPar.mjs.map