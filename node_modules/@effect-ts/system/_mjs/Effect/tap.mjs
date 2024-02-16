// ets_tracing: off
import { chain_ } from "./core.mjs";
import { map_ } from "./map.mjs";
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @ets_data_first tap_
 */

export function tap(f, __trace) {
  return fa => tap_(fa, f, __trace);
}
/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 */

export function tap_(_, f, __trace) {
  return chain_(_, a => map_(f(a), () => a), __trace);
}
//# sourceMappingURL=tap.mjs.map