import * as E from "@effect-ts/system/Either";
/**
 * Get `Show` for `Either` given `Show` of `E` & `A`
 */

export function getShow(SE, SA) {
  return {
    show: ma => E.isLeft(ma) ? `left(${SE.show(ma.left)})` : `right(${SA.show(ma.right)})`
  };
}
//# sourceMappingURL=getShow.mjs.map