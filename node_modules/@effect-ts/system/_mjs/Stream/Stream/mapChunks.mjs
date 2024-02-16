import * as T from "../_internal/effect.mjs";
import { mapChunksM_ } from "./mapChunksM.mjs";
/**
 * Transforms the chunks emitted by this stream.
 */

export function mapChunks_(self, f) {
  return mapChunksM_(self, o => T.succeed(f(o)));
}
/**
 * Transforms the chunks emitted by this stream.
 */

export function mapChunks(f) {
  return self => mapChunks_(self, f);
}
//# sourceMappingURL=mapChunks.mjs.map