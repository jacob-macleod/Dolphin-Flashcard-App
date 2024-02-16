import * as SK from "../Sink/index.mjs";
import { run_ } from "./run.mjs";
/**
 * Runs the stream and emits the number of elements processed
 *
 * Equivalent to `run(ZSink.count)`
 */

export function runCount(self) {
  return run_(self, SK.count);
}
//# sourceMappingURL=runCount.mjs.map