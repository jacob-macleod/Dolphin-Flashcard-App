// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { fromChunk } from "./fromChunk.mjs";
/**
 * Creates a single-valued pure stream
 */

export function succeed(a) {
  return fromChunk(A.single(a));
}
//# sourceMappingURL=succeed.mjs.map