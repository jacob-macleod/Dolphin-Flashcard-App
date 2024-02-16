import { chain_ } from "./core.mjs";
import { sleep } from "./sleep.mjs";
/**
 * Delay the effect of n milliseconds
 *
 * @ets_data_first delay_
 */

export function delay(ms, __trace) {
  return effect => delay_(effect, ms, __trace);
}
/**
 * Delay the effect of ms milliseconds
 */

export function delay_(effect, ms, __trace) {
  return chain_(sleep(ms, __trace), () => effect);
}
//# sourceMappingURL=delay.mjs.map