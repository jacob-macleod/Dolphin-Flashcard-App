// ets_tracing: off
import { fail as effectFail } from "../Effect/fail.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Fails the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */

export function fail_(promise, e) {
  return completeWith(effectFail(e))(promise);
}
/**
 * Fails the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */

export function fail(e) {
  return promise => fail_(promise, e);
}
//# sourceMappingURL=fail.mjs.map