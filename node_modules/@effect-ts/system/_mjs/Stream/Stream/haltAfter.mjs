// ets_tracing: off
import * as CL from "../../Clock/index.mjs";
import { haltWhen_ } from "./haltWhen.mjs";
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 */

export function haltAfter_(self, duration) {
  return haltWhen_(self, CL.sleep(duration));
}
/**
 * Specialized version of haltWhen which halts the evaluation of this stream
 * after the given duration.
 *
 * An element in the process of being pulled will not be interrupted when the
 * given duration completes. See `interruptAfter` for this behavior.
 */

export function haltAfter(duration) {
  return self => haltAfter_(self, duration);
}
//# sourceMappingURL=haltAfter.mjs.map