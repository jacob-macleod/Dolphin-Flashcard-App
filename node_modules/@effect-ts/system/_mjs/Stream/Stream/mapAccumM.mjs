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
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 *
 * @ets_data_first mapAccumM_
 */

export function mapAccumM(z, f) {
  return self => mapAccumM_(self, z, f);
}
/**
 * Statefully and effectfully maps over the elements of this stream to produce
 * new elements.
 */

export function mapAccumM_(self, z, f) {
  return new Stream(M.map_(M.bind_(M.bind_(M.do, "state", () => Ref.makeManagedRef(z)), "pull", () => M.mapM(BP.make)(self.proc)), ({
    pull,
    state
  }) => T.chain_(BP.pullElement(pull), o => T.mapError_(T.map_(T.tap_(T.bind_(T.bind_(T.do, "s", () => state.get), "t", ({
    s
  }) => f(s, o)), ({
    t
  }) => state.set(t.get(0))), ({
    t
  }) => A.single(t.get(1))), O.some))));
}
//# sourceMappingURL=mapAccumM.mjs.map