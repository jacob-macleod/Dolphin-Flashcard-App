import * as T from "../../../../Effect/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Creates a stream from a `Chunk` of values
 *
 * @param c a chunk of values
 * @return a finite stream of values
 */

export function fromChunkWith(c) {
  return new C.Stream(CH.unwrap(T.succeedWith(() => CH.writeWith(c))));
}
//# sourceMappingURL=fromChunkWith.mjs.map