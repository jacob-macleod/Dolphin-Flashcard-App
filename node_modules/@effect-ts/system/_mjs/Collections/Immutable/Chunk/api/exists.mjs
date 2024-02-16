import { concreteId } from "../definition.mjs";
/**
 * Determines whether a predicate is satisfied for at least one element of this chunk.
 */

export function exists_(self, f) {
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
 * Determines whether a predicate is satisfied for at least one element of this chunk.
 *
 * @ets_data_first exists_
 */

export function exists(f) {
  return self => exists_(self, f);
}
//# sourceMappingURL=exists.mjs.map