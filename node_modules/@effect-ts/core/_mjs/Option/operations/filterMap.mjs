// ets_tracing: off
import * as O from "@effect-ts/system/Option";
/**
 * Filter + Map
 *
 * @ets_data_first filterMap_
 */

export function filterMap(f) {
  return fa => filterMap_(fa, f);
}
/**
 * Filter + Map
 */

export function filterMap_(fa, f) {
  return O.isNone(fa) ? O.none : f(fa.value);
}
//# sourceMappingURL=filterMap.mjs.map