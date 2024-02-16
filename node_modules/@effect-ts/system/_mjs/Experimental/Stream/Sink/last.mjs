// ets_tracing: off
import * as O from "../../../Option/index.mjs";
import * as FoldLeft from "./foldLeft.mjs";
/**
 * Creates a sink containing the last value.
 */

export function last() {
  return FoldLeft.foldLeft(O.none, (_, in_) => O.some(in_));
}
//# sourceMappingURL=last.mjs.map