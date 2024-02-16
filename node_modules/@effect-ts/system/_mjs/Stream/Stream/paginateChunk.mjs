import * as T from "../_internal/effect.mjs";
import { paginateChunkM } from "./paginateChunkM.mjs";
/**
 * Like `unfoldChunk`, but allows the emission of values to end one step further than
 * the unfolding of the state. This is useful for embedding paginated APIs,
 * hence the name.
 */

export function paginateChunk(s, f) {
  return paginateChunkM(s, s => T.succeed(f(s)));
}
//# sourceMappingURL=paginateChunk.mjs.map