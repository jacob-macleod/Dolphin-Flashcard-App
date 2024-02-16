import * as FoldEffect from "./foldEffect.mjs";
/**
 * A sink that effectfully folds its inputs with the provided function and initial state.
 */

export function foldLeftEffect(z, f) {
  return FoldEffect.foldEffect(z, _ => true, f);
}
//# sourceMappingURL=foldLeftEffect.mjs.map