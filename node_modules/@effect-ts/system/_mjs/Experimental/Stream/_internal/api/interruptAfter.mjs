// ets_tracing: off
import * as CL from "../../../../Clock/index.mjs";
import * as InterruptWhen from "./interruptWhen.mjs";
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 */

export function interruptAfter_(self, duration) {
  return InterruptWhen.interruptWhen_(self, CL.sleep(duration));
}
/**
 * Specialized version of interruptWhen which interrupts the evaluation of this stream
 * after the given duration.
 *
 * @ets_data_first interruptAfter_
 */

export function interruptAfter(duration) {
  return self => interruptAfter_(self, duration);
}
//# sourceMappingURL=interruptAfter.mjs.map