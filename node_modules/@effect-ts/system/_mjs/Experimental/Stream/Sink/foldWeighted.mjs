// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as FoldWeightedDecompose from "./foldWeightedDecompose.mjs";
/**
 * Creates a sink that folds elements of type `In` into a structure
 * of type `S`, until `max` worth of elements (determined by the `costFn`)
 * have been folded.
 *
 * @note Elements that have an individual cost larger than `max` will
 * force the sink to cross the `max` cost. See `foldWeightedDecompose`
 * for a variant that can handle these cases.
 */

export function foldWeighted(z, costFn, max, f) {
  return FoldWeightedDecompose.foldWeightedDecompose(z, costFn, max, _ => CK.single(_), f);
}
//# sourceMappingURL=foldWeighted.mjs.map