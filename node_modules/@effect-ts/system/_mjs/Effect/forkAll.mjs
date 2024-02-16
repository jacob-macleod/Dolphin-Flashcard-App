import * as Fiber from "../Fiber/index.mjs";
import { fork } from "./core.mjs";
import { forEach_, forEachUnit_ } from "./excl-forEach.mjs";
import { map_ } from "./map.mjs";
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces a list of their results, in order.
 */

export function forkAll(effects, __trace) {
  return map_(forEach_(effects, fork, __trace), Fiber.collectAll);
}
/**
 * Returns an effect that forks all of the specified values, and returns a
 * composite fiber that produces unit. This version is faster than `forkAll`
 * in cases where the results of the forked fibers are not needed.
 */

export function forkAllUnit(effects, __trace) {
  return forEachUnit_(effects, fork, __trace);
}
//# sourceMappingURL=forkAll.mjs.map