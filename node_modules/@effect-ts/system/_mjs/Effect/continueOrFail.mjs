// ets_tracing: off
import { pipe } from "../Function/index.mjs";
import * as O from "../Option/core.mjs";
import { chain_, succeed } from "./core.mjs";
import { failWith } from "./fail.mjs";
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 */

export function continueOrFailM_(fa, f, pf, __trace) {
  return chain_(fa, a => O.getOrElse_(pf(a), () => failWith(f)), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * continue with the returned value.
 *
 * @ets_data_first continueOrFailM_
 */

export function continueOrFailM(f, pf, __trace) {
  return fa => continueOrFailM_(fa, f, pf, __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 */

export function continueOrFail_(fa, f, pf, __trace) {
  return continueOrFailM_(fa, f, x => O.map_(pf(x), succeed), __trace);
}
/**
 * Fail with `e` if the supplied `PartialFunction` does not match, otherwise
 * succeed with the returned value.
 *
 * @ets_data_first continueOrFail_
 */

export function continueOrFail(f, pf, __trace) {
  return fa => continueOrFail_(fa, f, pf, __trace);
}
//# sourceMappingURL=continueOrFail.mjs.map