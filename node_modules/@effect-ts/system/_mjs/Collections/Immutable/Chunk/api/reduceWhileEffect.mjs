// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import { concreteId } from "../definition.mjs";

function loop(s, iterator, array, i, length, pred, f) {
  if (i < length) {
    if (pred(s)) {
      return core.chain_(f(s, array[i]), s1 => loop(s1, iterator, array, i + 1, length, pred, f));
    } else {
      return core.succeed(s);
    }
  } else {
    const next = iterator.next();

    if (next.done) {
      return core.succeed(s);
    } else {
      const arr = next.value;
      return core.suspend(() => loop(s, iterator, arr, 0, arr.length, pred, f));
    }
  }
}
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 */


export function reduceWhileEffect_(self, s, pred, f) {
  const iterator = self.arrayLikeIterator();
  const next = iterator.next();

  if (next.done) {
    return core.succeed(s);
  } else {
    const array = next.value;
    const length = array.length;
    return loop(s, iterator, array, 0, length, pred, f);
  }
}
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first reduceWhileEffect_
 */

export function reduceWhileEffect(s, pred, f) {
  return self => reduceWhileEffect_(self, s, pred, f);
}
//# sourceMappingURL=reduceWhileEffect.mjs.map