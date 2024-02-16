// ets_tracing: off
import { succeed as effectSucceed } from "../Effect/core.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Completes the promise with the specified value.
 */

export function succeed(a) {
  return promise => completeWith(effectSucceed(a))(promise);
}
/**
 * Completes the promise with the specified value.
 */

export function succeed_(promise, a) {
  return completeWith(effectSucceed(a))(promise);
}
//# sourceMappingURL=succeed.mjs.map