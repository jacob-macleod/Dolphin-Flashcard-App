// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as MapChunks from "./mapChunks.mjs";
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 */

export function mapConcatChunk_(self, f) {
  return MapChunks.mapChunks_(self, CK.chain(f));
}
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 *
 * @ets_data_first mapConcatChunk_
 */

export function mapConcatChunk(f) {
  return self => mapConcatChunk_(self, f);
}
//# sourceMappingURL=mapConcatChunk.mjs.map