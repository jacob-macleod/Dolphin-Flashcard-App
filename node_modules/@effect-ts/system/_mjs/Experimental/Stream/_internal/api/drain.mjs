// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Converts this stream to a stream that executes its effects but emits no
 * elements. Useful for sequencing effects using streams:
 */

export function drain(self) {
  return new C.Stream(CH.drain(self.channel));
}
//# sourceMappingURL=drain.mjs.map