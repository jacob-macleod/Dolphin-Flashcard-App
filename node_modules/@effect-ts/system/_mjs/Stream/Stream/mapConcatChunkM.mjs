import { identity, pipe } from "../../Function/index.mjs";
import { mapConcatChunk } from "./mapConcatChunk.mjs";
import { mapM } from "./mapM.mjs";
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */

export function mapConcatChunkM_(self, f) {
  return mapConcatChunk(identity)(mapM(f)(self));
}
/**
 * Effectfully maps each element to a chunk, and flattens the chunks into
 * the output of this stream.
 */

export function mapConcatChunkM(f) {
  return self => mapConcatChunkM_(self, f);
}
//# sourceMappingURL=mapConcatChunkM.mjs.map