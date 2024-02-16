// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as FoldLeftChunks from "./foldLeftChunks.mjs";
import * as Map from "./map.mjs";
import * as Suspend from "./suspend.mjs";
export function mkString() {
  return Suspend.suspend(() => {
    const strings = [];
    return Map.map_(FoldLeftChunks.foldLeftChunks(undefined, (_, els) => CK.forEach_(els, el => {
      strings.push(String(el));
    })), _ => strings.join(""));
  });
}
//# sourceMappingURL=mkString.mjs.map