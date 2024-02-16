import { identity } from "../../../../Function/index.mjs";
import * as MapConcatChunk from "./mapConcatChunk.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */

export function mapConcatChunkEffect_(self, f) {
  return MapConcatChunk.mapConcatChunk_(MapEffect.mapEffect_(self, f), identity);
}
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 *
 * @ets_data_first mapConcatChunkEffect_
 */

export function mapConcatChunkEffect(f) {
  return self => mapConcatChunkEffect_(self, f);
}
//# sourceMappingURL=mapConcatChunkEffect.mjs.map