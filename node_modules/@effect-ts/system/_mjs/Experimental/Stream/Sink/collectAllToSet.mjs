// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as HS from "../../../Collections/Immutable/HashSet/index.mjs";
import * as FoldLeftChunks from "./foldLeftChunks.mjs";
/**
 * A sink that collects all of its inputs into a set.
 */

export function collectAllToSet() {
  return FoldLeftChunks.foldLeftChunks(HS.make(), (acc, as) => CK.reduce_(as, acc, (s, a) => HS.add_(s, a)));
}
//# sourceMappingURL=collectAllToSet.mjs.map