// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/index.mjs";
import { chain_, succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 *
 * @ets_data_first rejectM_
 */

export function rejectM(pf, __trace) {
  return self => rejectM_(self, pf, __trace);
}
/**
 * Continue with the returned computation if the `PartialFunction` matches,
 * translating the successful match into a failure, otherwise continue with
 * our held value.
 */

export function rejectM_(self, pf, __trace) {
  return chain_(self, a => O.fold_(pf(a), () => succeed(a), _ => chain_(_, e1 => fail(e1))), __trace);
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 *
 * @ets_data_first reject_
 */

export function reject(pf, __trace) {
  return self => reject_(self, pf);
}
/**
 * Fail with the returned value if the `PartialFunction` matches, otherwise
 * continue with our held value.
 */

export function reject_(self, pf, __trace) {
  return rejectM_(self, x => O.map_(pf(x), fail), __trace);
}
//# sourceMappingURL=reject.mjs.map