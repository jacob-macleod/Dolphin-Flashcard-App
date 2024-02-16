// ets_tracing: off
import * as C from "../Cause/cause.mjs";
import { haltWith } from "./core.mjs";
/**
 * Returns an effect that models failure with the specified error.
 * The moral equivalent of `throw` for pure code.
 */

export function fail(e, __trace) {
  return haltWith(trace => C.traced(C.fail(e), trace()), __trace);
}
/**
 * Returns an effect that models failure with the specified error.
 * The moral equivalent of `throw` for pure code.
 */

export function failWith(e, __trace) {
  return haltWith(trace => C.traced(C.fail(e()), trace()), __trace);
}
//# sourceMappingURL=fail.mjs.map