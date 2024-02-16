// ets_tracing: off
import * as T from "./_internal/effect.mjs";
/**
 * Interrupts the fiber from whichever fiber is calling this method. If the
 * fiber has already exited, the returned effect will resume immediately.
 * Otherwise, the effect will resume when the fiber exits.
 */

export function interrupt(fiber) {
  return T.chain_(T.fiberId, id => fiber.interruptAs(id));
}
//# sourceMappingURL=interrupt.mjs.map