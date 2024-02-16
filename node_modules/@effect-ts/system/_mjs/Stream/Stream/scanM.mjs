// ets_tracing: off
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../_internal/effect.mjs";
import { concat_ } from "./concat.mjs";
import { fromIterable } from "./fromIterable.mjs";
import { mapAccumM_ } from "./mapAccumM.mjs";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results of type `S` given an initial S.
 */

export function scanM(s) {
  return f => self => concat_(fromIterable([s]), mapAccumM_(self, s, (s, a) => T.map_(f(s, a), s => Tp.tuple(s, s))));
}
//# sourceMappingURL=scanM.mjs.map