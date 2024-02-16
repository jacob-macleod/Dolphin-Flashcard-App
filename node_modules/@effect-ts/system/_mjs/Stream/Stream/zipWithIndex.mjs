// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { mapAccum_ } from "./mapAccum.mjs";
/**
 * Zips this stream together with the index of elements.
 */

export function zipWithIndex(self) {
  return mapAccum_(self, 0, (index, a) => Tp.tuple(index + 1, Tp.tuple(a, index)));
}
//# sourceMappingURL=zipWithIndex.mjs.map