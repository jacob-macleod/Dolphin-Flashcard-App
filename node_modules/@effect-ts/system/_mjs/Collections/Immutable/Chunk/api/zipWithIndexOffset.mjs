// ets_tracing: off
import * as Tp from "../../Tuple/index.mjs";
import { append_, empty } from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 */

export function zipWithIndexOffset_(self, offset) {
  const iterator = self.arrayLikeIterator();
  let next;
  let i = offset;
  let builder = empty();

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let j = 0;

    while (j < len) {
      const a = array[j];
      builder = append_(builder, Tp.tuple(a, i));
      j++;
      i++;
    }
  }

  return builder;
}
/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @ets_data_first zipWithIndexOffset_
 */

export function zipWithIndexOffset(offset) {
  return self => zipWithIndexOffset_(self, offset);
}
//# sourceMappingURL=zipWithIndexOffset.mjs.map