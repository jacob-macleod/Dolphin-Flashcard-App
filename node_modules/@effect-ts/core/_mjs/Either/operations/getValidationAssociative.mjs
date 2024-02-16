import * as E from "@effect-ts/system/Either";
import { makeAssociative } from "../../Associative/index.mjs";
/**
 * Get an `Associative` instance for `Either` that combines both success and failure
 * given `Associative` of `A` & `E`.
 */

export function getValidationAssociative(SE, SA) {
  return makeAssociative((fx, fy) => E.isLeft(fx) ? E.isLeft(fy) ? E.left(SE.combine(fx.left, fy.left)) : fx : E.isLeft(fy) ? fy : E.right(SA.combine(fx.right, fy.right)));
}
//# sourceMappingURL=getValidationAssociative.mjs.map