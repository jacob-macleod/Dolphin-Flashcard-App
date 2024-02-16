// ets_tracing: off
import { done as effectDone } from "../Effect/done.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Exits the promise with the specified exit, which will be propagated to all
 * fibers waiting on the value of the promise.
 */

export function done(e) {
  return promise => completeWith(effectDone(e))(promise);
}
//# sourceMappingURL=done.mjs.map