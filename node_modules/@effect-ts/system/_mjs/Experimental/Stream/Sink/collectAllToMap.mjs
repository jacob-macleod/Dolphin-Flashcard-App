// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as HM from "../../../Collections/Immutable/HashMap/index.mjs";
import * as FoldLeftChunks from "./foldLeftChunks.mjs";
/**
 * A sink that collects all of its inputs into a map. The keys are extracted from inputs
 * using the keying function `key`; if multiple inputs use the same key, they are merged
 * using the `f` function.
 */

export function collectAllToMap(key, f) {
  return FoldLeftChunks.foldLeftChunks(HM.make(), (acc, as) => CK.reduce_(as, acc, (acc, a) => {
    const k = key(a);

    if (HM.has_(acc, k)) {
      return HM.update_(acc, k, v => f(v, a));
    } else {
      return HM.set_(acc, k, a);
    }
  }));
}
//# sourceMappingURL=collectAllToMap.mjs.map