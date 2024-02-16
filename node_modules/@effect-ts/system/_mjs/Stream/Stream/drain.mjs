// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { mapChunks_ } from "./mapChunks.mjs";
/**
 * Converts this stream to a stream that executes its effects but emits no
 * elements. Useful for sequencing effects using streams:
 */

export function drain(self) {
  return mapChunks_(self, _ => A.empty());
}
//# sourceMappingURL=drain.mjs.map