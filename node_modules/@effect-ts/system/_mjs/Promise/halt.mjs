import { halt as effectHalt } from "../Effect/core.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Halts the promise with the specified cause, which will be propagated to all
 * fibers waiting on the value of the promise.
 */

export function halt_(promise, e) {
  return completeWith(effectHalt(e))(promise);
}
/**
 * Halts the promise with the specified cause, which will be propagated to all
 * fibers waiting on the value of the promise.
 */

export function halt(e) {
  return promise => halt_(promise, e);
}
//# sourceMappingURL=halt.mjs.map