// ets_tracing: off
import * as O from "@effect-ts/system/Option";
/**
 * Returns `true` if `ma` contains `a`
 *
 * @ets_data_first elem_
 */

export function elem(E) {
  const el = elem_(E);
  return a => ma => el(ma, a);
}
/**
 * Returns `true` if `ma` contains `a`
 */

export function elem_(E) {
  return (ma, a) => O.isNone(ma) ? false : E.equals(a, ma.value);
}
//# sourceMappingURL=elem.mjs.map