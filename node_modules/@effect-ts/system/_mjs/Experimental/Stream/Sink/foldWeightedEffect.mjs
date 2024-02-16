// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../Effect/index.mjs";
import * as FoldWeightedDecomposeEffect from "./foldWeightedDecomposeEffect.mjs";
/**
 * Creates a sink that effectfully folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`) have
 * been folded.
 *
 * @note Elements that have an individual cost larger than `max` will
 * force the sink to cross the `max` cost. See `foldWeightedDecomposeM`
 * for a variant that can handle these cases.
 */

export function foldWeightedEffect(z, costFn, max, f) {
  return FoldWeightedDecomposeEffect.foldWeightedDecomposeEffect(z, costFn, max, i => T.succeed(CK.single(i)), f);
}
//# sourceMappingURL=foldWeightedEffect.mjs.map