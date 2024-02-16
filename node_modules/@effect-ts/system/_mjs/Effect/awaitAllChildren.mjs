// ets_tracing: off
import * as Fiber from "../Fiber/index.mjs";
import { ensuringChildren_ } from "./ensuringChildren.mjs";
/**
 * Returns a new effect that will not succeed with its value before first
 * waiting for the end of all child fibers forked by the effect.
 */

export function awaitAllChildren(fa, __trace) {
  return ensuringChildren_(fa, Fiber.waitAll, __trace);
}
//# sourceMappingURL=awaitAllChildren.mjs.map