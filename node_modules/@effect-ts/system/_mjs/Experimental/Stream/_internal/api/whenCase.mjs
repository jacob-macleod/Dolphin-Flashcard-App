// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as WhenCaseEffect from "./whenCaseEffect.mjs";
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given value, otherwise returns an empty stream.
 */

export function whenCase_(a, pf) {
  return WhenCaseEffect.whenCaseEffect_(T.succeed(a()), pf);
}
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given value, otherwise returns an empty stream.
 *
 * @ets_data_first whenCase_
 */

export function whenCase(pf) {
  return a => whenCase_(a, pf);
}
//# sourceMappingURL=whenCase.mjs.map