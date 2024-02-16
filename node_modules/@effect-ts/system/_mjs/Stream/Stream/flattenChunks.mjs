import * as M from "../_internal/managed.mjs";
import * as BP from "../BufferedPull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Submerges the chunks carried by this stream into the stream's structure, while
 * still preserving them.
 */

export function flattenChunks(self) {
  return new Stream(M.map_(M.mapM_(self.proc, BP.make), BP.pullElement));
}
//# sourceMappingURL=flattenChunks.mjs.map