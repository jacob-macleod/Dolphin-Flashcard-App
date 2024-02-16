// ets_tracing: off
import * as A from "../../../../Collections/Immutable/Array/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as ZipWith from "./zipWith.mjs";
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 */

export function zip_(...[s1, s2, ...streams]) {
  const init = ZipWith.zipWith_(s1, s2, Tp.tuple); // @ts-expect-error

  return A.reduce_(streams, init, (acc, v) => // @ts-expect-error
  ZipWith.zipWith_(acc, v, (a, b) => Tp.append_(a, b)));
}
/**
 * Zips this stream with another point-wise and emits tuples of elements from both streams.
 *
 * The new stream will end when one of the sides ends.
 *
 * @ets_data_first zip_
 */

export function zip(...[s1, ...streams]) {
  return self => // @ts-expect-error
  zip_(self, s1, ...streams);
}
//# sourceMappingURL=zip.mjs.map