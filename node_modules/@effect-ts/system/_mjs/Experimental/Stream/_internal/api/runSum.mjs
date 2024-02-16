import * as SK from "../../Sink/index.mjs";
import * as Run from "./run.mjs";
/**
 * Runs the stream to a sink which sums elements, provided they are Numeric.
 */

export function runSum(self) {
  return Run.run_(self, SK.sum());
}
//# sourceMappingURL=runSum.mjs.map