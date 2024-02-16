// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { fromChunk } from "./fromChunk.mjs";
/**
 * Creates a stream from an iterable collection of values
 */

export function fromIterable(as) {
  return fromChunk(A.from(as));
}
//# sourceMappingURL=fromIterable.mjs.map