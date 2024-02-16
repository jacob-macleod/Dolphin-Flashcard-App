import * as DropLeftover from "./dropLeftover.mjs";
import * as Fold from "./fold.mjs";
/**
 * A sink that folds its inputs with the provided function and initial state.
 */

export function foldLeft(z, f) {
  return DropLeftover.dropLeftover(Fold.fold(z, _ => true, f));
}
//# sourceMappingURL=foldLeft.mjs.map