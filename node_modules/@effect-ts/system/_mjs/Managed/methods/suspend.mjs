// ets_tracing: off
import { suspend as suspendEffect } from "../../Effect/core.mjs";
import { managedApply } from "../managed.mjs";
/**
 * Suspends the creation of this effect
 */

export function suspend(f, __trace) {
  return managedApply(suspendEffect(() => f().effect, __trace));
}
//# sourceMappingURL=suspend.mjs.map