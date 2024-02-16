import { zipWith_ } from "./zipWith.mjs";
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */

export function zipLeft_(self, that) {
  return zipWith_(self, that, o => o);
}
/**
 * Zips this stream with another point-wise, but keeps only the outputs of this stream.
 *
 * The new stream will end when one of the sides ends.
 */

export function zipLeft(that) {
  return self => zipLeft_(self, that);
}
//# sourceMappingURL=zipLeft.mjs.map