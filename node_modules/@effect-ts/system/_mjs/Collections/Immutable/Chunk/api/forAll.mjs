import { concreteId } from "../definition.mjs";
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 */

export function forAll_(self, f) {
  const iterator = self.arrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];

      if (!f(a)) {
        return false;
      }

      i++;
    }
  }

  return true;
}
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 *
 * @ets_data_first forAll_
 */

export function forAll(f) {
  return self => forAll_(self, f);
}
//# sourceMappingURL=forAll.mjs.map