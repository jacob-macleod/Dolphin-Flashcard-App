// ets_tracing: off
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { chain_ } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Sequentially zips this effect with the specified effect
 *
 * @ets_data_first zip_
 */

export function zip(b, __trace) {
  return a => zip_(a, b, __trace);
}
/**
 * Sequentially zips this effect with the specified effect
 */

export function zip_(a, b, __trace) {
  return chain_(a, ra => map_(b, rb => Tp.tuple(ra, rb)), __trace);
}
//# sourceMappingURL=zip.mjs.map