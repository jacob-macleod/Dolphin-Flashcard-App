// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Halt a stream with the specified exception
 */

export function dieWith(u) {
  return new C.Stream(CH.dieWith(u));
}
//# sourceMappingURL=dieWith.mjs.map