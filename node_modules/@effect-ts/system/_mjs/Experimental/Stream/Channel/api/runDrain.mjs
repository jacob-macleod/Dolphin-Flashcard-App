import * as Drain from "./drain.mjs";
import * as Run from "./run.mjs";
/**
 * Runs a channel until the end is received
 */

export function runDrain(self) {
  return Run.run(Drain.drain(self));
}
//# sourceMappingURL=runDrain.mjs.map