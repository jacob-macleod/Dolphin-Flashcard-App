// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import { unfoldChunkM } from "./unfoldChunkM.mjs";
/**
 * Creates a stream by effectfully peeling off the "layers" of a value of type `S`
 */

export function unfoldM(s, f) {
  return unfoldChunkM(s, _ => T.map_(f(_), O.map(({
    tuple: [a, s]
  }) => Tp.tuple(A.single(a), s))));
}
//# sourceMappingURL=unfoldM.mjs.map