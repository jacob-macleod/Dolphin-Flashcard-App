// ets_tracing: off
import { range } from "../Collections/Immutable/Array/index.mjs";
import { collectAllUnit } from "./excl-forEach.mjs";
/**
 * Replicates the given effect `n` times.
 *
 * @ets_data_first replicate_
 */

export function replicate(n, __trace) {
  return self => replicate_(self, n);
}
/**
 * Replicates the given effect `n` times.
 */

export function replicate_(self, n) {
  return range(0, n).map(() => self);
}
/**
 * Performs this effect the specified number of times, discarding the
 * results.
 */

export function replicateMUnit_(self, n) {
  return collectAllUnit(replicate_(self, n));
}
/**
 * Performs this effect the specified number of times, discarding the
 * results.
 */

export function replicateMUnit(n) {
  return self => replicateMUnit_(self, n);
}
//# sourceMappingURL=replicate.mjs.map