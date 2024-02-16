// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as Map from "./map.mjs";
import * as ZipPar from "./zipPar.mjs";
export function zipParLeft_(self, that) {
  return Map.map_(ZipPar.zipPar_(self, that), Tp.get(0));
}
/**
 * @ets_data_first zipParLeft_
 */

export function zipParLeft(that) {
  return self => zipParLeft_(self, that);
}
//# sourceMappingURL=zipParLeft.mjs.map