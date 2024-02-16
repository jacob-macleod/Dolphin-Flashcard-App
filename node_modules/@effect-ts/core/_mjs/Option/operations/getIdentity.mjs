// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import { makeIdentity } from "../../Identity/index.mjs";
export function getIdentity(A) {
  return makeIdentity(O.none, (x, y) => O.isNone(x) ? y : O.isNone(y) ? x : O.some(A.combine(x.value, y.value)));
}
//# sourceMappingURL=getIdentity.mjs.map