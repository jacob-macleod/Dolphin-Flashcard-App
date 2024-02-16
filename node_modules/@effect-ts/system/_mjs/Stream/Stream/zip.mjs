// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { zipWith_ } from "./zipWith.mjs";
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 */

export function zip_(self, that) {
  return zipWith_(self, that, Tp.tuple);
}
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 */

export function zip(that) {
  return self => zip_(self, that);
}
//# sourceMappingURL=zip.mjs.map