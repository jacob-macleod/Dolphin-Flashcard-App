// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as Chunk from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Returns the last index of the element that satisfies the predicate.
 */

export function findLastIndex_(self, f) {
  ;
  const iterator = self.reverseArrayLikeIterator();
  let next;
  let index = self.length - 1;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = len - 1;

    while (i >= 0) {
      const a = array[i];

      if (f(a)) {
        return O.some(index);
      }

      i--;
      index--;
    }
  }

  return O.none;
}
/**
 * Returns the last index of the element that satisfies the predicate.
 *
 * @ets_data_first findLastIndex_
 */

export function findLastIndex(f) {
  return self => findLastIndex_(self, f);
}
//# sourceMappingURL=findLastIndex.mjs.map