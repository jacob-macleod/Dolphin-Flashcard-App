// ets_tracing: off
import { append_, empty } from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Zips with chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk combined using the specified function
 * `both`. If one chunk is shorter than the other uses the specified
 * function `left` or `right` to map the element that does exist to the
 * result type.
 */

export function zipAllWith_(self, that, f, left, right) {
  const length = Math.max(self.length, that.length);

  if (length === 0) {
    return empty();
  }

  const leftIterator = self.arrayLikeIterator();
  const rightIterator = that.arrayLikeIterator();
  let i = 0;
  let j = 0;
  let k = 0;
  let leftLength = 0;
  let rightLength = 0;
  let leftArray = undefined;
  let rightArray = undefined;
  let leftNext;
  let rightNext;
  let builder = empty();

  while (i < length) {
    if (j < leftLength && k < rightLength) {
      builder = append_(builder, f(leftArray[j], rightArray[k]));
      i++;
      j++;
      k++;
    } else if (j === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
      leftArray = leftNext.value;
      leftLength = leftArray.length;
      j = 0;
    } else if (k === rightLength && (rightNext = rightIterator.next()) && !rightNext.done) {
      rightArray = rightNext.value;
      rightLength = rightArray.length;
      k = 0;
    } else if (j < leftLength) {
      builder = append_(builder, left(leftArray[j]));
      i++;
      j++;
    } else if (k < rightLength) {
      builder = append_(builder, right(rightArray[k]));
      i++;
      k++;
    }
  }

  return builder;
}
/**
 * Zips with chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk combined using the specified function
 * `both`. If one chunk is shorter than the other uses the specified
 * function `left` or `right` to map the element that does exist to the
 * result type.
 *
 * @ets_data_first zipAllWith_
 */

export function zipAllWith(that, f, left, right) {
  return self => zipAllWith_(self, that, f, left, right);
}
//# sourceMappingURL=zipAllWith.mjs.map