// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import { timeoutErrorCause } from "./timeoutErrorCause.mjs";
/**
 * Fails the stream with given error if it does not produce a value after d duration.
 */

export function timeoutError(e) {
  return d => timeoutErrorCause(C.fail(e()))(d);
}
//# sourceMappingURL=timeoutError.mjs.map