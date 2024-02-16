import * as T from "../../../../Effect/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import * as MH from "../_internal/mergeHelpers.mjs";
import * as MergeWith from "./mergeWith.mjs";
export function zipPar_(self, that) {
  return MergeWith.mergeWith_(self, that, exit1 => MH.await_(exit2 => T.done(Ex.zip_(exit1, exit2))), exit2 => MH.await_(exit1 => T.done(Ex.zip_(exit1, exit2))));
}
/**
 * @ets_data_first zipPar_
 */

export function zipPar(that) {
  return self => zipPar_(self, that);
}
//# sourceMappingURL=zipPar.mjs.map