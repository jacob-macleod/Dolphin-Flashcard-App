// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */

export function takeUntilM_(self, pred) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "keepTakingRef", () => T.toManaged(Ref.makeRef(true))), "pull", ({
    chunks,
    keepTakingRef
  }) => {
    return T.chain_(keepTakingRef.get, keepTaking => {
      if (!keepTaking) {
        return Pull.end;
      } else {
        return T.map_(T.tap_(T.let_(T.bind_(T.bind_(T.do, "chunk", () => chunks), "taken", ({
          chunk
        }) => T.asSomeError(A.takeWhileEffect_(chunk, _ => T.map_(pred(_), r => !r)))), "last", ({
          chunk,
          taken
        }) => A.take_(A.drop_(chunk, A.size(taken)), 1)), ({
          last
        }) => T.when_(keepTakingRef.set(false), () => !A.isEmpty(last))), ({
          last,
          taken
        }) => A.concat_(taken, last));
      }
    });
  }), ({
    pull
  }) => pull));
}
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */

export function takeUntilM(pred) {
  return self => takeUntilM_(self, pred);
}
//# sourceMappingURL=takeUntilM.mjs.map