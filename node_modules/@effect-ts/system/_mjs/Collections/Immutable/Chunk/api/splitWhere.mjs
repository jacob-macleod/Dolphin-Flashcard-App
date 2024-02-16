import { concreteId } from "../definition.mjs";
import { splitAt_ } from "./splitAt.mjs";
/**
 * Splits this chunk on the first element that matches this predicate.
 */

export function splitWhere_(self, f) {
  const iterator = self.arrayLikeIterator();
  let next;
  let cont = true;
  let i = 0;

  while (cont && (next = iterator.next()) && !next.done) {
    const array = next.value;
    const len = array.length;
    let j = 0;

    while (cont && j < len) {
      const a = array[j];

      if (f(a)) {
        cont = false;
      } else {
        i++;
        j++;
      }
    }
  }

  return splitAt_(self, i);
}
/**
 * Splits this chunk on the first element that matches this predicate.
 *
 * @ets_data_first splitWhere_
 */

export function splitWhere(f) {
  return self => splitWhere_(self, f);
}
//# sourceMappingURL=splitWhere.mjs.map