// ets_tracing: off
import { chain_ } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(b, f, __trace) {
  return a => zipWith_(a, b, f, __trace);
}
/**
 * Sequentially zips this effect with the specified effect using the
 * specified combiner function.
 */

export function zipWith_(a, b, f, __trace) {
  return chain_(a, ra => map_(b, rb => f(ra, rb)), __trace);
}
//# sourceMappingURL=zipWith.mjs.map