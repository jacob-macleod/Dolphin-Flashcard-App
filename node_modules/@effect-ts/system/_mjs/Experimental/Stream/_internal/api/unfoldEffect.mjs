// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as UnfoldChunkEffect from "./unfoldChunkEffect.mjs";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */

export function unfoldEffect(s, f) {
  return UnfoldChunkEffect.unfoldChunkEffect(s, _ => T.map_(f(_), O.map(({
    tuple: [a, s]
  }) => Tp.tuple(CK.single(a), s))));
}
//# sourceMappingURL=unfoldEffect.mjs.map