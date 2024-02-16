// ets_tracing: off
import { interruptAs as effectInterruptAs } from "../Effect/interruption.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Completes the promise with interruption. This will interrupt all fibers
 * waiting on the value of the promise as by the specified fiber.
 */

export function interruptAs(id) {
  return promise => completeWith(effectInterruptAs(id))(promise);
}
//# sourceMappingURL=interruptAs.mjs.map