// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { identity } from "../../../../Function/index.mjs";
import * as MapConcatChunk from "./mapConcatChunk.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */

export function mapConcatEffect_(self, f) {
  return MapConcatChunk.mapConcatChunk_(MapEffect.mapEffect_(self, a => T.map_(f(a), CK.from)), identity);
}
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 *
 * @ets_data_first mapConcatEffect_
 */

export function mapConcatEffect(f) {
  return self => mapConcatEffect_(self, f);
}
//# sourceMappingURL=mapConcatEffect.mjs.map