import * as O from "../../../../Option/index.mjs";
import { concreteId } from "../definition.mjs";
export function findLast_(self, f) {
  const iterator = self.reverseArrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = len - 1;

    while (i >= 0) {
      const a = array[i];

      if (f(a)) {
        return O.some(a);
      }

      i--;
    }
  }

  return O.none;
}
export function findLast(f) {
  return self => findLast_(self, f);
}
//# sourceMappingURL=findLast.mjs.map