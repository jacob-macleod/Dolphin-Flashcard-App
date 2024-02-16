// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as MapChunks from "./mapChunks.mjs";
/**
 * Exposes the underlying chunks of the stream as a stream of chunks of elements
 */

export function chunks(self) {
  return MapChunks.mapChunks_(self, CK.single);
}
//# sourceMappingURL=chunks.mjs.map