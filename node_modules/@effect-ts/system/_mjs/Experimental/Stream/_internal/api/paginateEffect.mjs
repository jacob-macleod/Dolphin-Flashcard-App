// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as PaginateChunkEffect from "./paginateChunkEffect.mjs";
/**
 * Like `unfoldEff`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginateEffect(s, f) {
  return PaginateChunkEffect.paginateChunkEffect(s, _ => T.map_(f(_), ({
    tuple: [a, s]
  }) => Tp.tuple(CK.single(a), s)));
}
//# sourceMappingURL=paginateEffect.mjs.map