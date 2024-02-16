// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as Map from "./map.mjs";
import * as ZipPar from "./zipPar.mjs";
export function zipParRight_(self, that) {
  return Map.map_(ZipPar.zipPar_(self, that), Tp.get(1));
}
/**
 * @ets_data_first zipParRight_
 */

export function zipParRight(that) {
  return self => zipParRight_(self, that);
}
//# sourceMappingURL=zipParRight.mjs.map