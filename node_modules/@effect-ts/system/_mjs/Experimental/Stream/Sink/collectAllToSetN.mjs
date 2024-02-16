// ets_tracing: off
import * as HS from "../../../Collections/Immutable/HashSet/index.mjs";
import * as FoldWeighted from "./foldWeighted.mjs";
/**
 * A sink that collects first `n` distinct inputs into a set.
 */

export function collectAllToSetN(n) {
  return FoldWeighted.foldWeighted(HS.make(), (acc, in_) => HS.has_(acc, in_) ? 0 : 1, n, (s, a) => HS.add_(s, a));
}
//# sourceMappingURL=collectAllToSetN.mjs.map