// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Concat from "./concat.mjs";
import * as FromChunk from "./fromChunk.mjs";
import * as Intersperse from "./intersperse.mjs";
/**
 * Intersperse and also add a prefix and a suffix
 */

export function intersperseAffixes_(self, start, middle, end) {
  return Concat.concat_(Concat.concat_(FromChunk.fromChunk(CK.single(start)), Intersperse.intersperse_(self, middle)), FromChunk.fromChunk(CK.single(end)));
}
/**
 * Intersperse and also add a prefix and a suffix
 *
 * @ets_data_first intersperseAffixes_
 */

export function intersperseAffixes(start, middle, end) {
  return self => intersperseAffixes_(self, start, middle, end);
}
//# sourceMappingURL=intersperseAffixes.mjs.map