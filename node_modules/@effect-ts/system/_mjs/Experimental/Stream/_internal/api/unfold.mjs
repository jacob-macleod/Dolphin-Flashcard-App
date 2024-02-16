// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as UnfoldChunk from "./unfoldChunk.mjs";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`
 */

export function unfold(s, f) {
  return UnfoldChunk.unfoldChunk(s, _ => O.map_(f(_), ({
    tuple: [a, s]
  }) => Tp.tuple(CK.single(a), s)));
}
//# sourceMappingURL=unfold.mjs.map