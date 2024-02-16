import { bracket_ } from "./bracket.mjs";
import { chain_ } from "./core.mjs";
import { forkDaemon } from "./core-scope.mjs";
import { fiberId } from "./fiberId.mjs";
/**
 * Fork the effect into a separate fiber wrapping it in a bracket and returining the
 * `use` handle. Acquisition will fork and release will interrupt the fiber
 */

export function bracketFiber_(effect, use, __trace) {
  return bracket_(forkDaemon(effect), f => chain_(fiberId, f.interruptAs), use, __trace);
}
/**
 * Fork the effect into a separate fiber wrapping it in a bracket.
 * Acquisition will fork and release will interrupt the fiber.
 *
 * @ets_data_first bracketFiber_
 */

export function bracketFiber(use, __trace) {
  return effect => bracketFiber_(effect, use, __trace);
}
//# sourceMappingURL=bracketFiber.mjs.map