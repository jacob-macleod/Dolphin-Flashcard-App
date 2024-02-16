// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Returns a lazily constructed sink that may require effects for its creation.
 */

export function suspend(f) {
  return new C.Sink(CH.suspend(() => f().channel));
}
//# sourceMappingURL=suspend.mjs.map