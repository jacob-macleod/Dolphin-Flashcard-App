// ets_tracing: off
import { ArrayIndexOutOfBoundsException } from "../../GlobalExceptions/index.mjs";
import * as O from "../../Option/index.mjs";
import * as STM from "../STM/index.mjs";
import * as TRef from "../TRef/index.mjs";
export const TArrayTypeId = /*#__PURE__*/Symbol();
export class TArray {
  constructor(array) {
    this.array = array;
    this._typeId = TArrayTypeId;
  }

}
/**
 * Makes a new `TArray` initialized with provided iterable.
 */

export function fromIterable(it) {
  return STM.map_(STM.forEach_(it, TRef.make), as => new TArray(as));
}
/**
 * Makes a new `TArray` that is initialized with specified values.
 */

export function make(...data) {
  return fromIterable(data);
}
/**
 * Makes a new `TArray` that is initialized with specified values.
 */

export function empty() {
  return fromIterable([]);
}
/**
 * Extracts value from ref in array.
 */

export function get_(self, index) {
  if (!Number.isInteger(index) || index < 0 || index >= self.array.length) {
    return STM.die(new ArrayIndexOutOfBoundsException(index));
  }

  return TRef.get(self.array[index]);
}
/**
 * Extracts value from ref in array.
 *
 * @ets_data_first get_
 */

export function get(index) {
  return self => get_(self, index);
}
/**
 * Find the first element in the array matching a predicate.
 */

export function find_(self, p) {
  return new STM.STMEffect(journal => {
    let i = 0;

    while (i < self.array.length) {
      const a = TRef.unsafeGet_(self.array[i], journal);

      if (p(a)) {
        return O.some(a);
      }

      i++;
    }

    return O.none;
  });
}
/**
 * Find the first element in the array matching a predicate.
 *
 * @ets_data_first find_
 */

export function find(p) {
  return self => find_(self, p);
}
/**
 * Find the last element in the array matching a predicate.
 */

export function findLast_(self, p) {
  return new STM.STMEffect(journal => {
    let i = 0;
    let res = O.emptyOf();

    while (i < self.array.length) {
      const a = TRef.unsafeGet_(self.array[i], journal);

      if (p(a)) {
        res = O.some(a);
      }

      i++;
    }

    return res;
  });
}
/**
 * Find the last element in the array matching a predicate.
 *
 * @ets_data_first find_
 */

export function findLast(p) {
  return self => findLast_(self, p);
}
//# sourceMappingURL=index.mjs.map