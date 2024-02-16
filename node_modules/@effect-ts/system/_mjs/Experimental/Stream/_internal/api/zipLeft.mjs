import * as ZipWith from "./zipWith.mjs";
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */

export function zipLeft_(self, that) {
  return ZipWith.zipWith_(self, that, (o, _) => o);
}
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zipLeft_
 */

export function zipLeft(that) {
  return self => zipLeft_(self, that);
}
//# sourceMappingURL=zipLeft.mjs.map