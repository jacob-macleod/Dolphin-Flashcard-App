// ets_tracing: off
import * as CL from "../../../Clock/index.mjs";
import * as Summarized from "./summarized.mjs";
/**
 * Returns the sink that executes this one and times its execution.
 */

export function timed(self) {
  return Summarized.summarized_(self, CL.currentTime, (start, end) => end - start);
}
//# sourceMappingURL=timed.mjs.map