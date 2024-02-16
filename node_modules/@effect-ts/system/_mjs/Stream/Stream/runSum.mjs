// ets_tracing: off
import * as SK from "../Sink/index.mjs";
import { run_ } from "./run.mjs";
/**
 * Runs the stream to completion and yields the last value emitted by it,
 * discarding the rest of the elements.
 */

export function runSum(self) {
  return run_(self, SK.sum);
}
//# sourceMappingURL=runSum.mjs.map