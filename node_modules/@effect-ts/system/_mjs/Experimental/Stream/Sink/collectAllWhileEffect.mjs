// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as L from "../../../Collections/Immutable/List/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as FoldEffect from "./foldEffect.mjs";
import * as Map from "./map.mjs";
/**
 * Accumulates incoming elements into a chunk as long as they verify effectful predicate `p`.
 */

export function collectAllWhileEffect(p) {
  return Map.map_(FoldEffect.foldEffect(Tp.tuple(L.empty(), true), Tp.get(1), ({
    tuple: [as, _]
  }, a) => T.map_(p(a), _ => {
    if (_) {
      return Tp.tuple(L.prepend_(as, a), true);
    } else {
      return Tp.tuple(as, false);
    }
  })), ({
    tuple: [is, _]
  }) => CK.from(L.reverse(is)));
}
//# sourceMappingURL=collectAllWhileEffect.mjs.map