// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as FromChunkWith from "./fromChunkWith.mjs";
/**
 * Creates a single-valued pure stream
 */

export function succeedWith(o) {
  return FromChunkWith.fromChunkWith(() => CK.single(o()));
}
//# sourceMappingURL=succeedWith.mjs.map