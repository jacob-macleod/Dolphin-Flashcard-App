// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as MapAccum from "./mapAccum.mjs";
/**
 * Zips this stream together with the index of elements.
 */

export function zipWithIndex(self) {
  return MapAccum.mapAccum_(self, 0, (index, a) => Tp.tuple(index + 1, Tp.tuple(a, index)));
}
//# sourceMappingURL=zipWithIndex.mjs.map