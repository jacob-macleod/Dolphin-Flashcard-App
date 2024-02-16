// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Returns a sink that executes a total effect and ends with its result.
 */

export function succeedWith(effect) {
  return new C.Sink(CH.succeedWith(effect));
}
//# sourceMappingURL=succeedWith.mjs.map