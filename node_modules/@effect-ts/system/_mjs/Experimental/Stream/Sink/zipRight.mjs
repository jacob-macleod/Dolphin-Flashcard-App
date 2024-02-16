import * as ZipWith from "./zipWith.mjs";
/**
 * Like `zip`, but keeps only the result from this sink.
 */

export function zipRight_(self, that) {
  return ZipWith.zipWith_(self, that, (_, z1) => z1);
}
/**
 * Like `zip`, but keeps only the result from this sink.
 *
 * @ets_data_first zipRight_
 */

export function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=zipRight.mjs.map