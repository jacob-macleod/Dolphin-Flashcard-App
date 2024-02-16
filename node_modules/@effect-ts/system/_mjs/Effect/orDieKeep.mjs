// ets_tracing: off
import * as Cause from "../Cause/core.mjs";
import { foldCauseM_, halt, succeed } from "./core.mjs";
/**
 * Converts all failures to unchecked exceptions
 */

export function orDieKeep(effect, __trace) {
  return foldCauseM_(effect, ce => halt(Cause.chain(e => Cause.die(e))(ce)), succeed, __trace);
}
//# sourceMappingURL=orDieKeep.mjs.map