import { map_ } from "./map.mjs";
/**
 * Maps the success value of this effect to the specified constant value.
 */

export function as_(self, b, __trace) {
  return map_(self, () => b, __trace);
}
/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */

export function as(b, __trace) {
  return self => as_(self, b, __trace);
}
//# sourceMappingURL=as.mjs.map