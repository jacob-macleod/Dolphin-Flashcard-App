// ets_tracing: off
import * as CL from "../../../../Clock/index.mjs";
import * as HaltWhen from "./haltWhen.mjs";
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 */

export function halfAfter_(self, duration) {
  return HaltWhen.haltWhen_(self, CL.sleep(duration));
}
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 *
 * @ets_data_first haltAfter_
 */

export function halfAfter(duration) {
  return self => halfAfter_(self, duration);
}
//# sourceMappingURL=haltAfter.mjs.map