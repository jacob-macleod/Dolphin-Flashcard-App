import { orElse_ } from "./orElse.mjs";
import { succeed } from "./succeed.mjs";
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */

export function orElseSucceed_(self, o1) {
  return orElse_(self, succeed(o1));
}
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */

export function orElseSucceed(o1) {
  return self => orElseSucceed_(self, o1);
}
//# sourceMappingURL=orElseSucceed.mjs.map