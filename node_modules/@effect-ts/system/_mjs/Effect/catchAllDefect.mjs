// ets_tracing: off
import * as O from "../Option/index.mjs";
import { catchSomeDefect_ } from "./catchSomeDefect.mjs";
/**
 * Recovers from all defects with provided function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 */

export function catchAllDefect_(fa, f, __trace) {
  return catchSomeDefect_(fa, u => O.some(f(u)), __trace);
}
/**
 * Recovers from all defects with provided function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @ets_data_first catchAllDefect_
 */

export function catchAllDefect(f, __trace) {
  return effect => catchAllDefect_(effect, f, __trace);
}
//# sourceMappingURL=catchAllDefect.mjs.map