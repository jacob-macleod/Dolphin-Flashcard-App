// ets_tracing: off
import { interruptAll } from "../Fiber/index.mjs";
import { ensuringChildren_ } from "./ensuringChildren.mjs";
/**
 * Returns a new effect that will not succeed with its value before first
 * interrupting all child fibers forked by the effect.
 */

export function interruptAllChildren(self, __trace) {
  return ensuringChildren_(self, interruptAll, __trace);
}
//# sourceMappingURL=interruptAllChildren.mjs.map