// ets_tracing: off
import * as CK from "../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as Chain from "./chain.mjs";
import * as FoldUntil from "./foldUntil.mjs";
import * as FromEffect from "./fromEffect.mjs";
import * as Map from "./map.mjs";
/**
 * A sink that collects first `n` elements into a chunk. Note that the chunk
 * is preallocated and must fit in memory.
 */

export function collectAllN(n) {
  return Map.map_(Chain.chain_(FromEffect.fromEffect(T.succeedWith(() => CK.builder())), cb => FoldUntil.foldUntil(cb, n, (s, in_) => s.append(in_))), _ => _.build());
}
//# sourceMappingURL=collectAllN.mjs.map