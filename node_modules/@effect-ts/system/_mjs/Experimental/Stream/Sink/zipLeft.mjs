import * as ZipWith from "./zipWith.mjs";
/**
 * Like `zip`, but keeps only the result from the `that` sink.
 */

export function zipLeft_(self, that) {
  return ZipWith.zipWith_(self, that, (z, _) => z);
}
/**
 * Like `zip`, but keeps only the result from `that sink.
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(that) {
  return self => zipLeft_(self, that);
}
//# sourceMappingURL=zipLeft.mjs.map