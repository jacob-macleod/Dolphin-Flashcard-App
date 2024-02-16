// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as RM from "../../../../Managed/ReleaseMap/index.mjs";
import * as C from "../core.mjs";
import * as AcquireReleaseExitWith from "./acquireReleaseExitWith.mjs";
export function managed_(m, use) {
  return AcquireReleaseExitWith.acquireReleaseExitWith_(RM.makeReleaseMap, releaseMap => {
    return C.chain_(C.fromEffect(T.map_(T.provideSome_(m.effect, _ => Tp.tuple(_, releaseMap)), Tp.get(1))), use);
  }, (releaseMap, exit) => RM.releaseAll(exit, T.sequential)(releaseMap));
}
/**
 * @ets_data_first managed_
 */

export function managed(use) {
  return m => managed_(m, use);
}
//# sourceMappingURL=managed.mjs.map