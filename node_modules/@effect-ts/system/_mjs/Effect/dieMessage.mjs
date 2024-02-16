// ets_tracing: off
import { RuntimeError } from "../Cause/index.mjs";
import { dieWith } from "./die.mjs";
/**
 * Returns an effect that dies with a {@link RuntimeError} having the
 * specified text message. This method can be used for terminating a fiber
 * because a defect has been detected in the code.
 */

export function dieMessage(message, __trace) {
  return dieWith(() => new RuntimeError(message), __trace);
}
//# sourceMappingURL=dieMessage.mjs.map