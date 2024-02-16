import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Creates a sink halting with a specified cause.
 */

export function failCause(e) {
  return new C.Sink(CH.failCause(e));
}
//# sourceMappingURL=failCause.mjs.map