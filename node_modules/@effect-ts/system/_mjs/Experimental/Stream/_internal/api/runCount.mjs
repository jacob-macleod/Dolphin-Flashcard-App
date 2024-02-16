import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Runs the stream and emits the number of elements processed
 */

export function runCount(self) {
  return Run.run_(self, SK.count());
}
//# sourceMappingURL=runCount.mjs.map