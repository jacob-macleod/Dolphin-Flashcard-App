import { fail } from "./fail.mjs";
import { orElse_ } from "./orElse.mjs";
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElseFail_(self, e) {
  return orElse_(self, fail(e));
}
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElseFail(e) {
  return self => orElseFail_(self, e);
}
//# sourceMappingURL=orElseFail.mjs.map