// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import { concreteId } from "../definition.mjs";
/**
 * Returns the first element that satisfies the effectful predicate.
 */

export function findEffect_(self, f) {
  return T.suspend(() => {
    const iterator = self.arrayLikeIterator();
    let next;

    const loop = (iterator, array, i, length) => {
      if (i < length) {
        const a = array[i];
        return T.chain_(f(a), r => r ? T.succeed(O.some(a)) : loop(iterator, array, i + 1, length));
      } else if (!(next = iterator.next()).done) {
        return loop(iterator, next.value, 0, next.value.length);
      } else {
        return T.succeed(O.none);
      }
    };

    next = iterator.next();

    if (!next.done) {
      return loop(iterator, next.value, 0, next.value.length);
    } else {
      return T.succeed(O.none);
    }
  });
}
/**
 * Returns the first element that satisfies the effectful predicate.
 *
 * @ets_data_first findEffect_
 */

export function findEffect(f) {
  return self => findEffect_(self, f);
}
//# sourceMappingURL=findEffect.mjs.map