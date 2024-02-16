// ets_tracing: off
import { traced } from "../Cause/index.mjs";
import { foldCauseM_, haltWith, succeed } from "./core.mjs";
/**
 * Attach a wrapping trace pointing to this location in case of error.
 *
 * Useful when joining fibers to make the resulting trace mention
 * the `join` point, otherwise only the traces of joined fibers are
 * included.
 */

export function refailWithTrace(self, __trace) {
  return foldCauseM_(self, cause => haltWith(trace => traced(cause, trace())), succeed, __trace);
}
//# sourceMappingURL=refailWithTrace.mjs.map