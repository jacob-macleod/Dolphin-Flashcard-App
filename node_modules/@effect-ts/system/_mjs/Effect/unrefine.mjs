// ets_tracing: off
import * as C from "../Cause/index.mjs";
import { identity, pipe } from "../Function/index.mjs";
import * as O from "../Option/core.mjs";
import { catchAllCause_ } from "./catchAllCause.mjs";
import { halt } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Takes some fiber failures and converts them into errors.
 *
 * @ets_data_first unrefine_
 */

export function unrefine(pf, __trace) {
  return fa => unrefine_(fa, pf, __trace);
}
/**
 * Takes some fiber failures and converts them into errors.
 */

export function unrefine_(fa, pf, __trace) {
  return unrefineWith_(fa, pf, identity, __trace);
}
/**
 * Takes some fiber failures and converts them into errors, using the
 * specified function to convert the `E` into an `E1 | E2`.
 *
 * @ets_data_first unrefineWith_
 */

export function unrefineWith(pf, f, __trace) {
  return fa => unrefineWith_(fa, pf, f, __trace);
}
/**
 * Takes some fiber failures and converts them into errors, using the
 * specified function to convert the `E` into an `E1 | E2`.
 */

export function unrefineWith_(fa, pf, f, __trace) {
  return catchAllCause_(fa, cause => O.fold_(C.find(c => c._tag === "Die" ? pf(c.value) : O.none)(cause), () => halt(C.map(f)(cause)), fail), __trace);
}
//# sourceMappingURL=unrefine.mjs.map