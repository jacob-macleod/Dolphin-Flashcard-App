// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Intersperse stream with provided element similar to <code>List.mkString</code>.
 */

export function intersperse_(self, middle) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "state", () => Ref.makeManagedRef(true)), "chunks", () => self.proc), "pull", ({
    chunks,
    state
  }) => T.chain_(chunks, os => {
    return Ref.modify_(state, first => {
      let builder = A.empty();
      let flagResult = first;

      for (const o of os) {
        if (flagResult) {
          flagResult = false;
          builder = A.append_(builder, o);
        } else {
          builder = A.append_(A.append_(builder, middle), o);
        }
      }

      return Tp.tuple(builder, flagResult);
    });
  })), ({
    pull
  }) => pull));
}
/**
 * Intersperse stream with provided element similar to <code>List.mkString</code>.
 */

export function intersperse(middle) {
  return self => intersperse_(self, middle);
}
//# sourceMappingURL=intersperse.mjs.map