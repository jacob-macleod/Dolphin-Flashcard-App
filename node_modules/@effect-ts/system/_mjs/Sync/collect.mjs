// ets_tracing: off
import { compact } from "../Collections/Immutable/Chunk/api/compact.mjs";
import { map_ } from "./core.mjs";
import { forEach_ } from "./excl-forEach.mjs";
import { optional } from "./optional.mjs";
/**
 * Evaluate each sync in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 *
 * @ets_data_first collect_
 */

export function collect(f) {
  return self => collect_(self, f);
}
/**
 * Evaluate each Sync in the structure from left to right, collecting the
 * the successful values and discarding the empty cases. For a parallel version, see `collectPar`.
 */

export function collect_(self, f) {
  return map_(forEach_(self, a => optional(f(a))), compact);
}
//# sourceMappingURL=collect.mjs.map