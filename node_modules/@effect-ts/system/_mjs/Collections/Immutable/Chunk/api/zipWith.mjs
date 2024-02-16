// ets_tracing: off
import { append_, empty } from "../core.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 */

export function zipWith_(self, that, f) {
  const length = Math.min(self.length, that.length);

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
  let left = undefined;
  let right = undefined;
  let leftNext;
  let rightNext;
  let builder = empty();

  while (i < length) {
    if (j < leftLength && k < rightLength) {
      builder = append_(builder, f(left[j], right[k]));
      i++;
      j++;
      k++;
    } else if (j === leftLength && (leftNext = leftIterator.next()) && !leftNext.done) {
      left = leftNext.value;
      leftLength = left.length;
      j = 0;
    } else if (k === rightLength && (rightNext = rightIterator.next()) && !rightNext.done) {
      right = rightNext.value;
      rightLength = right.length;
      k = 0;
    }
  }

  return builder;
}
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @ets_data_first zipWith_
 */

export function zipWith(that, f) {
  return self => zipWith_(self, that, f);
}
//# sourceMappingURL=zipWith.mjs.map