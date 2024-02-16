// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Returns the index of the first element that satisfies the predicate.
 */

export function findIndex_(self, f) {
  const iterator = self.arrayLikeIterator();
  let next;
  let index = 0;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];

      if (f(a)) {
        return O.some(index);
      }

      i++;
      index++;
    }
  }

  return O.none;
}
/**
 * Returns the index of the first element that satisfies the predicate.
 *
 * @ets_data_first findIndex_
 */

export function findIndex(f) {
  return self => findIndex_(self, f);
}
//# sourceMappingURL=findIndex.mjs.map