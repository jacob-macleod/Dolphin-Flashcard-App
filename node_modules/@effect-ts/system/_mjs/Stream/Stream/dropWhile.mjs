// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */

export function dropWhile_(self, pred) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "keepDroppingRef", () => T.toManaged(Ref.makeRef(true))), "pull", ({
    chunks,
    keepDroppingRef
  }) => {
    const go = T.chain_(chunks, chunk => T.chain_(keepDroppingRef.get, keepDropping => {
      if (!keepDropping) {
        return T.succeed(chunk);
      } else {
        const remaining = A.dropWhile_(chunk, pred);
        const empty = A.isEmpty(remaining);

        if (empty) {
          return go;
        } else {
          return T.as_(keepDroppingRef.set(false), remaining);
        }
      }
    }));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Drops all elements of the stream for as long as the specified predicate
 * evaluates to `true`.
 */

export function dropWhile(pred) {
  return self => dropWhile_(self, pred);
}
//# sourceMappingURL=dropWhile.mjs.map