// ets_tracing: off
import * as Fiber from "../Fiber/index.mjs";
import { chain_, succeedWith } from "./core.mjs";
/**
 * Creates a `Effect` value that represents the exit value of the specified
 * fiber.
 */

export function fromFiber(fiber, __trace) {
  return chain_(succeedWith(fiber), Fiber.join, __trace);
}
/**
 * Creates a `Effect` value that represents the exit value of the specified
 * fiber.
 */

export function fromFiberM(fiber, __trace) {
  return chain_(fiber, Fiber.join, __trace);
}
//# sourceMappingURL=fromFiber.mjs.map