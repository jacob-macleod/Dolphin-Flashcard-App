import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Runs the stream to completion and yields the last value emitted by it,
 * discarding the rest of the elements.
 */

export function runLast(self) {
  return Run.run_(self, SK.last());
}
//# sourceMappingURL=runLast.mjs.map