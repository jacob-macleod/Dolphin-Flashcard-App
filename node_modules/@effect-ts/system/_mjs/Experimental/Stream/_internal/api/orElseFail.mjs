import * as Fail from "./fail.mjs";
import * as OrElse from "./orElse.mjs";
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElseFail_(self, e1) {
  return OrElse.orElse_(self, Fail.fail(e1()));
}
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElseFail_
 */

export function orElseFail(e1) {
  return self => orElseFail_(self, e1);
}
//# sourceMappingURL=orElseFail.mjs.map