// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */

export function collectWhileMap_(self, f) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    chunks,
    doneRef
  }) => T.chain_(doneRef.get, done => {
    if (done) {
      return Pull.end;
    } else {
      return T.chain_(T.bind_(T.do, "chunk", () => chunks), ({
        chunk
      }) => {
        const remaining = A.collectWhile_(chunk, f);
        return T.as_(T.when_(doneRef.set(true), () => A.size(remaining) < A.size(chunk)), remaining);
      });
    }
  })), ({
    pull
  }) => pull));
}
/**
 * Transforms all elements of the stream for as long as the specified partial function is defined.
 */

export function collectWhileMap(f) {
  return self => collectWhileMap_(self, f);
}
export function collectWhile_(self, f) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "doneRef", () => T.toManaged(Ref.makeRef(false))), "pull", ({
    chunks,
    doneRef
  }) => T.chain_(doneRef.get, done => {
    if (done) {
      return Pull.end;
    } else {
      return T.chain_(T.bind_(T.do, "chunk", () => chunks), ({
        chunk
      }) => {
        const remaining = A.collectWhile_(chunk, O.fromPredicate(f));
        return T.as_(T.when_(doneRef.set(true), () => A.size(remaining) < A.size(chunk)), remaining);
      });
    }
  })), ({
    pull
  }) => pull));
}
export function collectWhile(f) {
  return self => collectWhile_(self, f);
}
//# sourceMappingURL=collectWhileMap.mjs.map