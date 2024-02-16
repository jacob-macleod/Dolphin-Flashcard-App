// ets_tracing: off
import { pipe } from "../../../../Function/index.mjs";
import * as CH from "../../Channel/index.mjs";
export function runManaged_(self, sink) {
  return CH.runManaged(CH.drain(CH.pipeTo_(self.channel, sink.channel)));
}
/**
 * @ets_data_first runManaged_
 */

export function runManaged(sink) {
  return self => runManaged_(self, sink);
}
//# sourceMappingURL=runManaged.mjs.map