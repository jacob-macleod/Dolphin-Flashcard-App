// ets_tracing: off
import { die as effectDie } from "../Effect/die.mjs";
import { completeWith } from "./completeWith.mjs";
/**
 * Kills the promise with the specified error, which will be propagated to all
 * fibers waiting on the value of the promise.
 */

export function die(e) {
  return promise => completeWith(effectDie(e))(promise);
}
//# sourceMappingURL=die.mjs.map