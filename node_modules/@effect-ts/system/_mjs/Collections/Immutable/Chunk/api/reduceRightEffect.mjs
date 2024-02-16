// ets_tracing: off
import * as core from "../../../../Effect/core.mjs";
import { concrete, SingletonTypeId } from "../definition.mjs";
import { reduceRight_ } from "./reduceRight.mjs";
/**
 * Folds over the elements in this chunk from the right.
 */

export function reduceRightEffect_(self, s, f) {
  ;

  if (self._typeId === SingletonTypeId) {
    return f(self.a, s);
  }

  return reduceRight_(self, core.succeed(s), (a, s) => core.chain_(s, s1 => f(a, s1)));
}
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRightEffect_
 */

export function reduceRightEffect(s, f) {
  return self => reduceRightEffect_(self, s, f);
}
//# sourceMappingURL=reduceRightEffect.mjs.map