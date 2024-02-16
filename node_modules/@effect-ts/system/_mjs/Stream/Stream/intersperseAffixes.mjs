// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import { concat } from "./concat.mjs";
import { fromChunk } from "./fromChunk.mjs";
import { intersperse_ } from "./intersperse.mjs";
/**
 * Intersperse and also add a prefix and a suffix
 */

export function intersperseAffixes(self, start, middle, end) {
  return concat(fromChunk(A.single(end)))(concat(intersperse_(self, middle))(fromChunk(A.single(start))));
}
//# sourceMappingURL=intersperseAffixes.mjs.map