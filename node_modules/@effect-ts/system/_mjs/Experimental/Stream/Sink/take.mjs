// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as Chain from "./chain.mjs";
import * as C from "./core.mjs";
import * as FoldChunks from "./foldChunks.mjs";
/*
 * A sink that takes the specified number of values.
 */

export function take(n) {
  return Chain.chain_(FoldChunks.foldChunks(CK.empty(), _ => CK.size(_) < n, (a, b) => CK.concat_(a, b)), acc => {
    const {
      tuple: [taken, leftover]
    } = CK.splitAt_(acc, n);
    return new C.Sink(CH.zipRight_(CH.write(leftover), CH.end(taken)));
  });
}
//# sourceMappingURL=take.mjs.map