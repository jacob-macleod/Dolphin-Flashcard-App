// ets_tracing: off
import * as O from "../../../Option/index.mjs";
import * as Fold from "./fold.mjs";
/**
 * Creates a sink containing the first value.
 */

export function head() {
  return Fold.fold(O.none, O.isNone, (s, in_) => O.fold_(s, () => O.some(in_), _ => s));
}
//# sourceMappingURL=head.mjs.map