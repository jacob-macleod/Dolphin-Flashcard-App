// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as BP from "../BufferedPull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Performs an effectful filter and map in a single step.
 */

export function collectM_(self, f) {
  return new Stream(M.map_(M.let_(M.bind_(M.do, "as", () => M.mapM_(self.proc, BP.make)), "pull", ({
    as
  }) => {
    const go = T.chain_(BP.pullElement(as), o => O.fold_(f(o), () => go, v => T.bimap_(v, O.some, A.single)));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Performs an effectful filter and map in a single step.
 */

export function collectM(f) {
  return self => collectM_(self, f);
}
//# sourceMappingURL=collectM.mjs.map