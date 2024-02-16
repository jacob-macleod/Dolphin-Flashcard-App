// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as FromChunk from "./fromChunk.mjs";
/**
 * Creates a stream from an iterable collection of values
 */

export function fromIterable(as) {
  return FromChunk.fromChunk(CK.from(as));
}
//# sourceMappingURL=fromIterable.mjs.map