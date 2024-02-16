// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Exposes the underlying chunks of the stream as a stream of chunks of elements
 */

export function chunks(self) {
  return mapChunks_(self, A.single);
}
//# sourceMappingURL=chunks.mjs.map