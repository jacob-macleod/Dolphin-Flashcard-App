// ets_tracing: off
import * as A from "../../../../Collections/Immutable/Array/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as CrossWith from "./crossWith.mjs";
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 */

export function cross_(...[s1, s2, ...streams]) {
  const init = CrossWith.crossWith_(s1, s2, Tp.tuple); // @ts-expect-error

  return A.reduce_(streams, init, (acc, v) => // @ts-expect-error
  CrossWith.crossWith_(acc, v, (a, b) => Tp.append_(a, b)));
}
/**
 * Composes this stream with the specified stream to create a cartesian product of elements.
 * The `that` stream would be run multiple times, for every element in the `this` stream.
 *
 * @ets_data_first cross_
 */

export function cross(...[s1, ...streams]) {
  return self => // @ts-expect-error
  cross_(self, s1, ...streams);
}
//# sourceMappingURL=cross.mjs.map