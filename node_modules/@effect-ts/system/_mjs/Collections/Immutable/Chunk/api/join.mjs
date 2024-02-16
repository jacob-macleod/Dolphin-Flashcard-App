import { reduce_ } from "./reduce.mjs";
/**
 * joins the elements together with "sep" in the middle
 */

export function join_(self, sep) {
  return reduce_(self, "", (s, a) => s.length > 0 ? `${s}${sep}${a}` : a);
}
/**
 * joins the elements together with "sep" in the middle
 *
 * @ets_data_first join_
 */

export function join(sep) {
  return self => join_(self, sep);
}
//# sourceMappingURL=join.mjs.map