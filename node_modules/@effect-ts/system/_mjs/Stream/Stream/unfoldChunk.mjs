import * as T from "../_internal/effect.mjs";
import { unfoldChunkM } from "./unfoldChunkM.mjs";
/**
 * Creates a stream by peeling off the "layers" of a value of type `S`.
 */

export function unfoldChunk(s, f) {
  return unfoldChunkM(s, s => T.succeed(f(s)));
}
//# sourceMappingURL=unfoldChunk.mjs.map