// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function dropLeftover(self) {
  return new C.Sink(CH.drain(self.channel));
}
//# sourceMappingURL=dropLeftover.mjs.map