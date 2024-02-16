// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as BP from "../BufferedPull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanM`.
 */

export function scanReduceM_(self, f) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "state", () => Ref.makeManagedRef(O.none)), "pull", () => M.mapM_(self.proc, _ => BP.make(_))), ({
    pull,
    state
  }) => T.chain_(BP.pullElement(pull), curr => T.chain_(state.get, O.fold(() => T.as_(state.set(O.some(curr)), A.single(curr)), s => T.asSomeError(T.map_(T.tap_(f(s, curr), o => state.set(O.some(o))), A.single)))))));
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce all
 * intermediate results.
 *
 * See also `Stream#scanM`.
 */

export function scanReduceM(f) {
  return self => scanReduceM_(self, f);
}
//# sourceMappingURL=scanReduceM.mjs.map