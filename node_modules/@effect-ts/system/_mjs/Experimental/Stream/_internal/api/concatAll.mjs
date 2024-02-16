// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Concat from "./concat.mjs";
import * as Empty from "./empty.mjs";
/**
 * Concatenates all of the streams in the chunk to one stream.
 */

export function concatAll(streams) {
  return CK.reduce_(streams, Empty.empty, (a, b) => Concat.concat_(a, b));
}
//# sourceMappingURL=concatAll.mjs.map