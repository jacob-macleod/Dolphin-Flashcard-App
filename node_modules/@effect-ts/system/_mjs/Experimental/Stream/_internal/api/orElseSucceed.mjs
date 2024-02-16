import * as OrElse from "./orElse.mjs";
import * as Succeed from "./succeed.mjs";
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */

export function orElseSucceed_(self, a1) {
  return OrElse.orElse_(self, Succeed.succeed(a1));
}
/**
 * Succeeds with the specified value if this one fails with a typed error.
 *
 * @ets_data_first orElseSucceed_
 */

export function orElseSucceed(a1) {
  return self => orElseSucceed_(self, a1);
}
//# sourceMappingURL=orElseSucceed.mjs.map