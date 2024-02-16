import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Runs the stream and collects ignore its elements.
 */

export function runDrain(self) {
  return Run.run_(self, SK.drain());
}
//# sourceMappingURL=runDrain.mjs.map