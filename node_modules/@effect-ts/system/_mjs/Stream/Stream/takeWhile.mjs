// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { chunk } from "../Take/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */

export function takeWhile_(self, pred) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    chunks,
    doneRef
  }) => T.chain_(doneRef.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.map_(T.tap_(T.let_(T.bind_(T.do, "chunk", () => chunks), "taken", ({
        chunk
      }) => A.takeWhile_(chunk, pred)), ({
        taken
      }) => T.when_(doneRef.set(true), () => A.size(taken) < chunk.length)), ({
        taken
      }) => taken);
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Takes all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */

export function takeWhile(pred) {
  return self => takeWhile_(self, pred);
}
//# sourceMappingURL=takeWhile.mjs.map