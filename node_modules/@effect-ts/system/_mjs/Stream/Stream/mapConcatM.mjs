// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import { mapConcatChunkM_ } from "./mapConcatChunkM.mjs";
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */

export function mapConcatM_(self, f) {
  return mapConcatChunkM_(self, o => T.map_(f(o), A.from));
}
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */

export function mapConcatM(f) {
  return self => mapConcatM_(self, f);
}
//# sourceMappingURL=mapConcatM.mjs.map