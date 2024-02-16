// ets_tracing: off
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Transforms the chunks emitted by this stream.
 */

export function map_(self, f) {
  return mapChunks_(self, Chunk.map(f));
}
/**
 * Transforms the chunks emitted by this stream.
 */

export function map(f) {
  return self => map_(self, f);
}
//# sourceMappingURL=map.mjs.map