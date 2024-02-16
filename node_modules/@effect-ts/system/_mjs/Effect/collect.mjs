// ets_tracing: off
import { compact } from "../Collections/Immutable/Chunk/api/compact.mjs";
import { forEach_, forEachPar_, forEachParN_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
import { optional } from "./optional.mjs";
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */

export function collect(f, __trace) {
  return self => collect_(self, f, __trace);
}
/**
 * Evaluate each effect in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */

export function collect_(self, f, __trace) {
  return map_(forEach_(self, a => optional(f(a)), __trace), compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * @ets_data_first collectPar_
 */

export function collectPar(f, __trace) {
  return self => collectPar_(self, f, __trace);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 */

export function collectPar_(self, f, __trace) {
  return map_(forEachPar_(self, a => optional(f(a)), __trace), compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 */

export function collectParN_(self, n, f, __trace) {
  return map_(forEachParN_(self, n, a => optional(f(a)), __trace), compact);
}
/**
 * Evaluate each effect in the structure in parallel, collecting the
 * the successful values and discarding the empty cases.
 *
 * Unlike `collectPar`, this method will use at most up to `n` fibers.
 *
 * @ets_data_first collectParN_
 */

export function collectParN(n, f, __trace) {
  return self => collectParN_(self, n, f, __trace);
}
//# sourceMappingURL=collect.mjs.map