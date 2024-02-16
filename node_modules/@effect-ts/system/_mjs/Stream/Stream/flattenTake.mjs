import { flattenChunks } from "./flattenChunks.mjs";
import { flattenExitOption } from "./flattenExitOption.mjs";
/**
 * Unwraps `Exit` values and flatten chunks that also signify end-of-stream by failing with `None`.
 */

export function flattenTake(self) {
  return flattenChunks(flattenExitOption(self));
}
//# sourceMappingURL=flattenTake.mjs.map