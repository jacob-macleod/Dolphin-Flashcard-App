// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Repeats the provided value infinitely.
 */

export function repeat(a) {
  return new C.Stream(CH.repeated(CH.write(CK.single(a))));
}
//# sourceMappingURL=repeat.mjs.map