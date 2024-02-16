// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Buffer from "./buffer.mjs";
export function bufferChunk(ref) {
  return Buffer.buffer(CK.empty(), _ => CK.isEmpty(_), ref);
}
//# sourceMappingURL=bufferChunk.mjs.map