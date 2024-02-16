// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Repeats this stream forever.
 */

export function forever(self) {
  return new C.Stream(CH.repeated(self.channel));
}
//# sourceMappingURL=forever.mjs.map