// ets_tracing: off
import * as HM from "../../../Collections/Immutable/HashMap/index.mjs";
import * as FoldWeighted from "./foldWeighted.mjs";
/**
 * A sink that collects first `n` keys into a map. The keys are calculated
 * from inputs using the keying function `key`; if multiple inputs use the
 * the same key, they are merged using the `f` function.
 */

export function collectAllToMapN(n, key, f) {
  return FoldWeighted.foldWeighted(HM.make(), (acc, in_) => HM.has_(acc, key(in_)) ? 0 : 1, n, (acc, in_) => {
    const k = key(in_);

    if (HM.has_(acc, k)) {
      return HM.update_(acc, k, v => f(v, in_));
    } else {
      return HM.set_(acc, k, in_);
    }
  });
}
//# sourceMappingURL=collectAllToMapN.mjs.map