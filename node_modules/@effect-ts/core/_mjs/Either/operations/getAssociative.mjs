import * as E from "@effect-ts/system/Either";
import { makeAssociative } from "../../Associative/index.mjs";
/**
 * Get `Associative` for `Either` given `Associative` of `A`
 */

export function getAssociative(S) {
  return makeAssociative((x, y) => E.isLeft(y) ? x : E.isLeft(x) ? y : E.right(S.combine(x.right, y.right)));
}
//# sourceMappingURL=getAssociative.mjs.map