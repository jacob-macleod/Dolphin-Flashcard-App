// ets_tracing: off
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as FoldEffect from "./foldEffect.mjs";
import * as Map from "./map.mjs";
/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S` until `max` elements have been folded.
 *
 * Like `foldWeightedM`, but with a constant cost function of 1.
 */

export function foldUntilEffect(z, max, f) {
  return Map.map_(FoldEffect.foldEffect(Tp.tuple(z, 0), ({
    tuple: [_, a]
  }) => a < max, ({
    tuple: [o, count]
  }, i) => T.map_(f(o, i), _ => Tp.tuple(_, count + 1))), Tp.get(0));
}
//# sourceMappingURL=foldUntilEffect.mjs.map