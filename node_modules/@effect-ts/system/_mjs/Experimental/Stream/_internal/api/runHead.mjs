import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Runs the stream to collect the first value emitted by it without running
 * the rest of the stream.
 */

export function runHead(self) {
  return Run.run_(self, SK.head());
}
//# sourceMappingURL=runHead.mjs.map