// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 */

export function mapConcatChunk_(self, f) {
  return mapChunks_(self, o => A.chain_(o, f));
}
/**
 * Maps each element to a chunk, and flattens the chunks into the output of
 * this stream.
 */

export function mapConcatChunk(f) {
  return self => mapConcatChunk_(self, f);
}
//# sourceMappingURL=mapConcatChunk.mjs.map