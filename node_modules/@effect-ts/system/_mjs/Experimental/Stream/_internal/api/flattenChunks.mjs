// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Submerges the chunks carried by this stream into the stream's structure, while
 * still preserving them.
 */

export function flattenChunks(self) {
  return new C.Stream(CH.mapOut_(self.channel, CK.flatten));
}
//# sourceMappingURL=flattenChunks.mjs.map