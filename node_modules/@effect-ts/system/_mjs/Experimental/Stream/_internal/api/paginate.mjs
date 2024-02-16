// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as PaginateChunk from "./paginateChunk.mjs";
/**
 * Like `unfold`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginate(s, f) {
  return PaginateChunk.paginateChunk(s, s => {
    const {
      tuple: [a, b]
    } = f(s);
    return Tp.tuple(CK.single(a), b);
  });
}
//# sourceMappingURL=paginate.mjs.map