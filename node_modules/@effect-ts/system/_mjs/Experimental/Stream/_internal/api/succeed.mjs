// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as FromChunk from "./fromChunk.mjs";
/**
 * Creates a single-valued pure stream
 */

export function succeed(o) {
  return FromChunk.fromChunk(CK.single(o));
}
//# sourceMappingURL=succeed.mjs.map