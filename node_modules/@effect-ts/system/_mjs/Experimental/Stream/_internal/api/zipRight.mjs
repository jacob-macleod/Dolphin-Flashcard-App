import * as ZipWith from "./zipWith.mjs";
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 */

export function zipRight_(self, that) {
  return ZipWith.zipWith_(self, that, (_, o) => o);
}
/**
 * Zips this stream with another point-wise, but keeps only the outputs of the other stream.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zipRight_
 */

export function zipRight(that) {
  return self => zipRight_(self, that);
}
//# sourceMappingURL=zipRight.mjs.map