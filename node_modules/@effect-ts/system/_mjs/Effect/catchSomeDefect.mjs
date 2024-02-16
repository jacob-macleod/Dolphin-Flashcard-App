import { catchAll_ } from "./catchAll.mjs";
import { fail } from "./fail.mjs";
import { unrefineWith_ } from "./unrefine.mjs";
/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 */

export function catchSomeDefect_(fa, f, __trace) {
  return catchAll_(unrefineWith_(fa, f, fail), s => s, __trace);
}
/**
 * Recovers from some or all of the defects with provided partial function.
 *
 * '''WARNING''': There is no sensible way to recover from defects. This
 * method should be used only at the boundary between Effect and an external
 * system, to transmit information on a defect for diagnostic or explanatory
 * purposes.
 *
 * @dataFist catchSomeDefect_
 */

export function catchSomeDefect(f, __trace) {
  return effect => catchSomeDefect_(effect, f, __trace);
}
//# sourceMappingURL=catchSomeDefect.mjs.map