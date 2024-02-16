// ets_tracing: off
import { pipe } from "../../../../Function/index.mjs";
import * as FlattenChunks from "./flattenChunks.mjs";
import * as FlattenExitOption from "./flattenExitOption.mjs";
import * as Map from "./map.mjs";
/**
 * Unwraps `Exit` values and flatten chunks that also signify end-of-stream by failing with `None`.
 */

export function flattenTake(self) {
  return FlattenChunks.flattenChunks(FlattenExitOption.flattenExitOption(Map.map_(self, _ => _.exit)));
}
//# sourceMappingURL=flattenTake.mjs.map