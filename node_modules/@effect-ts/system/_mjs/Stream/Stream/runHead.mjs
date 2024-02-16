// ets_tracing: off
import * as SK from "../Sink/index.mjs";
import { run_ } from "./run.mjs";
/**
 * Runs the stream to completion and yields the first value emitted by it,
 * discarding the rest of the elements.
 */

export function runHead(self) {
  return run_(self, SK.head());
}
//# sourceMappingURL=runHead.mjs.map