// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../Option/index.mjs";
import { mapAccum_ } from "./mapAccum.mjs";
/**
 * Zips each element with the previous element. Initially accompanied by `None`.
 */

export function zipWithPrevious(self) {
  return mapAccum_(self, O.none, (prev, next) => Tp.tuple(O.some(next), Tp.tuple(prev, next)));
}
//# sourceMappingURL=zipWithPrevious.mjs.map