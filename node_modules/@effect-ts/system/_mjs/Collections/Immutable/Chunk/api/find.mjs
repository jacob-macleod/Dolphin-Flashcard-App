import * as O from "../../../../Option/index.mjs";
import { concreteId } from "../definition.mjs";
export function find_(self, f) {
  const iterator = self.arrayLikeIterator();
  let next;

  while ((next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let i = 0;

    while (i < len) {
      const a = array[i];

      if (f(a)) {
        return O.some(a);
      }

      i++;
    }
  }

  return O.none;
}
export function find(f) {
  return self => find_(self, f);
}
//# sourceMappingURL=find.mjs.map