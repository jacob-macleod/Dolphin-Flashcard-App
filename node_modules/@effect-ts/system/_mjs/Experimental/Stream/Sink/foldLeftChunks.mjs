import * as FoldChunks from "./foldChunks.mjs";
/**
 * A sink that folds its input chunks with the provided function and initial state.
 * `f` must preserve chunking-invariance.
 */

export function foldLeftChunks(z, f) {
  return FoldChunks.foldChunks(z, _ => true, f);
}
//# sourceMappingURL=foldLeftChunks.mjs.map