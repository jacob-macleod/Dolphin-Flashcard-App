// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as L from "../../../Collections/Immutable/List/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as Fold from "./fold.mjs";
import * as Map from "./map.mjs";
/**
 * Accumulates incoming elements into a chunk as long as they verify predicate `p`.
 */

export function collectAllWhile(p) {
  return Map.map_(Fold.fold(Tp.tuple(L.empty(), true), Tp.get(1), ({
    tuple: [as, _]
  }, a) => {
    if (p(a)) {
      return Tp.tuple(L.prepend_(as, a), true);
    } else {
      return Tp.tuple(as, false);
    }
  }), ({
    tuple: [is, _]
  }) => CK.from(L.reverse(is)));
}
//# sourceMappingURL=collectAllWhile.mjs.map