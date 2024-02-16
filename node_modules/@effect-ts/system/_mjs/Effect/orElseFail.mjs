import { fail } from "./fail.mjs";
import { orElse_ } from "./orElse.mjs";
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 *
 * @ets_data_first orElseFail_
 */

export function orElseFail(e, __trace) {
  return self => orElseFail_(self, e, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 */

export function orElseFail_(self, e, __trace) {
  return orElse_(self, () => fail(e), __trace);
}
//# sourceMappingURL=orElseFail.mjs.map