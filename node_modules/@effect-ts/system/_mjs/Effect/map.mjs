// ets_tracing: off
import { chain_, succeed } from "./core.mjs";
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 */

export function map_(_, f, __trace) {
  return chain_(_, a => succeed(f(a)), __trace);
}
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_data_first map_
 */

export function map(f, __trace) {
  return self => map_(self, f);
}
//# sourceMappingURL=map.mjs.map