// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import { concrete, SingletonTypeId } from "../definition.mjs";
import { reduce_ } from "./reduce.mjs";
/**
 * Folds over the elements in this chunk from the left.
 */

export function reduceEffect_(self, s, f) {
  ;

  if (self._typeId === SingletonTypeId) {
    return f(s, self.a);
  }

  return reduce_(self, core.succeed(s), (s, a) => core.chain_(s, s1 => f(s1, a)));
}
/**
 * Folds over the elements in this chunk from the left.
 *
 * @ets_data_first reduceEffect_
 */

export function reduceEffect(s, f) {
  return self => reduceEffect_(self, s, f);
}
//# sourceMappingURL=reduceEffect.mjs.map