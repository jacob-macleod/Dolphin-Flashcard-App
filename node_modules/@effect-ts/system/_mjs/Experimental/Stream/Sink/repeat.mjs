// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as CollectAllWhileWith from "./collectAllWhileWith.mjs";
export function repeat(self) {
  return CollectAllWhileWith.collectAllWhileWith_(self, CK.empty(), _ => true, (s, z) => CK.append_(s, z));
}
//# sourceMappingURL=repeat.mjs.map