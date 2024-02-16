// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as BP from "../BufferedPull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Maps over elements of the stream with the specified effectful function.
 */

export function mapM_(self, f) {
  return new Stream(M.map_(M.mapM(BP.make)(self.proc), pull => T.chain_(BP.pullElement(pull), o => T.bimap(O.some, o1 => A.single(o1))(f(o)))));
}
/**
 * Maps over elements of the stream with the specified effectful function.
 */

export function mapM(f) {
  return self => mapM_(self, f);
}
//# sourceMappingURL=mapM.mjs.map