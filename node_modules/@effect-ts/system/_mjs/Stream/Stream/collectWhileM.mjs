// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as BP from "../../Stream/BufferedPull/index.mjs";
import * as Pull from "../../Stream/Pull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */

export function collectWhileM_(self, pf) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "as", () => M.mapM_(self.proc, BP.make)), "done", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    as,
    done
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(BP.pullElement(as), a => O.fold_(pf(a), () => T.zipRight_(done.set(true), Pull.end), v => T.bimap_(v, O.some, A.single)));
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Effectfully transforms all elements of the stream for as long as the specified partial function is defined.
 */

export function collectWhileM(pf) {
  return self => collectWhileM_(self, pf);
}
//# sourceMappingURL=collectWhileM.mjs.map