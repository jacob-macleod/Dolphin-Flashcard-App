// ets_tracing: off
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as ReleaseMap from "../../../../Managed/ReleaseMap/index.mjs";
import * as C from "../core.mjs";
import * as MapOut from "./mapOut.mjs";
/**
 * Use a managed to emit an output element
 */

export function managedOut(self) {
  return MapOut.mapOut_(C.acquireReleaseOutExitWith_(T.chain_(ReleaseMap.makeReleaseMap, releaseMap => T.map_(T.provideSome_(self.effect, _ => Tp.tuple(_, releaseMap)), ({
    tuple: [_, out]
  }) => Tp.tuple(out, releaseMap))), ({
    tuple: [_, releaseMap]
  }, exit) => ReleaseMap.releaseAll(exit, T.sequential)(releaseMap)), Tp.get(0));
}
//# sourceMappingURL=managedOut.mjs.map