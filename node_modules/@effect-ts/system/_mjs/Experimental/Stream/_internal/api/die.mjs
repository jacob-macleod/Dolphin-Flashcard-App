// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Halt a stream with the specified exception
 */

export function die(u) {
  return new C.Stream(CH.die(u));
}
//# sourceMappingURL=die.mjs.map