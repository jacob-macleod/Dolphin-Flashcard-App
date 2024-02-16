// ets_tracing: off
import * as CS from "../../../Cause/index.mjs";
import * as FailCause from "./failCause.mjs";
/**
 * Creates a sink halting with the specified `Throwable`.
 */

export function die(e) {
  return FailCause.failCause(CS.die(e));
}
//# sourceMappingURL=die.mjs.map