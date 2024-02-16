import * as DropLeftover from "./dropLeftover.mjs";
import * as FoldChunksEffect from "./foldChunksEffect.mjs";
/**
 * A sink that effectfully folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */

export function foldLeftChunksEffect(z, f) {
  return DropLeftover.dropLeftover(FoldChunksEffect.foldChunksEffect(z, _ => true, f));
}
//# sourceMappingURL=foldLeftChunksEffect.mjs.map