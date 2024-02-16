// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a stream from a `Chunk` of values
 *
 * @param c a chunk of values
 * @return a finite stream of values
 */

export function fromChunk(c) {
  return new C.Stream(CH.suspend(() => CK.isEmpty(c) ? CH.unit : CH.write(c)));
}
//# sourceMappingURL=fromChunk.mjs.map