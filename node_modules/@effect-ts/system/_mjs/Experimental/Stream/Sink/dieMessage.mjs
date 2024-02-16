// ets_tracing: off
import * as CS from "../../../Cause/index.mjs";
import * as FailCause from "./failCause.mjs";
/**
 * Creates a sink halting with the specified message, wrapped in a
 * `RuntimeException`.
 */

export function dieMessage(message) {
  return FailCause.failCause(CS.die(new CS.RuntimeError(message)));
}
//# sourceMappingURL=dieMessage.mjs.map