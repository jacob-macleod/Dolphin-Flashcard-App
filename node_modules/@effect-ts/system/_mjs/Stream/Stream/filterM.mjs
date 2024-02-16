// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as O from "../../Option/index.mjs";
import * as BP from "../../Stream/BufferedPull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Effectfully filters the elements emitted by this stream.
 */

export function filterM_(self, f) {
  return new Stream(M.map_(M.mapM_(self.proc, BP.make), os => {
    const pull = T.chain_(BP.pullElement(os), o => T.chain_(T.mapError_(f(o), v => O.some(v)), _ => {
      if (_) {
        return T.succeed(A.single(o));
      } else {
        return pull;
      }
    }));
    return pull;
  }));
}
/**
 * Effectfully filters the elements emitted by this stream.
 */

export function filterM(f) {
  return self => filterM_(self, f);
}
//# sourceMappingURL=filterM.mjs.map