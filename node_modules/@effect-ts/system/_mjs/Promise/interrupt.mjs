// ets_tracing: off
import { chain_ } from "../Effect/core.mjs";
import { fiberId } from "../Effect/fiberId.mjs";
import { interruptAs as effectInterruptAs } from "../Effect/interruption.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Completes the promise with interruption. This will interrupt all fibers
 * waiting on the value of the promise as by the fiber calling this method.
 */

export function interrupt(promise) {
  return chain_(fiberId, id => completeWith(effectInterruptAs(id))(promise));
}
//# sourceMappingURL=interrupt.mjs.map