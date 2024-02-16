// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../_internal/effect.mjs";
import { paginateChunkM } from "./paginateChunkM.mjs";
/**
 * Like `unfoldM`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginateM(s) {
  return f => paginateChunkM(s, _ => T.map_(f(_), ({
    tuple: [a, s]
  }) => Tp.tuple(A.single(a), s)));
}
//# sourceMappingURL=paginateM.mjs.map