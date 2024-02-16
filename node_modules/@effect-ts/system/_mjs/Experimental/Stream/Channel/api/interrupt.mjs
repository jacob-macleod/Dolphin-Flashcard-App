// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as C from "../core.mjs";
export function interrupt(fiberId) {
  return C.failCause(CS.interrupt(fiberId));
}
//# sourceMappingURL=interrupt.mjs.map