// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Transforms the elements of this stream using the supplied function.
 */

export function map_(self, f) {
  return new C.Stream(CH.mapOut_(self.channel, o => CK.map_(o, f)));
}
/**
 * Transforms the elements of this stream using the supplied function.
 *
 * @ets_data_first map_
 */

export function map(f) {
  return self => map_(self, f);
}
//# sourceMappingURL=map.mjs.map