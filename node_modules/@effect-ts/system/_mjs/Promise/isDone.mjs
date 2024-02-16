// ets_tracing: off
import { succeedWith } from "../Effect/core.mjs";
/**
 * Checks for completion of this Promise. Produces true if this promise has
 * already been completed with a value or an error and false otherwise.
 */

export function isDone(promise) {
  return succeedWith(() => promise.state.get._tag === "Done");
}
//# sourceMappingURL=isDone.mjs.map