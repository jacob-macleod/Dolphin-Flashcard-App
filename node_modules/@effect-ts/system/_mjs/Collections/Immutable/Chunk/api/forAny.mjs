import { concreteId } from "../definition.mjs";
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 */

export function forAny_(self, f) {
  const iterator = self.arrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];

      if (f(a)) {
        return true;
      }

      i++;
    }
  }

  return false;
}
/**
 * Determines whether a predicate is satisfied for all elements of this chunk.
 *
 * @ets_data_first forAll_
 */

export function forAny(f) {
  return self => forAny_(self, f);
}
//# sourceMappingURL=forAny.mjs.map