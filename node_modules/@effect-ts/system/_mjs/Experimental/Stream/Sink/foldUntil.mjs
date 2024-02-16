// ets_tracing: off
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as Fold from "./fold.mjs";
import * as Map from "./map.mjs";
/**
 * Creates a sink that folds elements of type `In` into a structure
 * of type `S` until `max` elements have been folded.
 *
 * Like `foldWeighted`, but with a constant cost function of 1.
 */

export function foldUntil(z, max, f) {
  return Map.map_(Fold.fold(Tp.tuple(z, 0), _ => Tp.get_(_, 1) < max, ({
    tuple: [o, count]
  }, i) => Tp.tuple(f(o, i), count + 1)), Tp.get(0));
}
//# sourceMappingURL=foldUntil.mjs.map