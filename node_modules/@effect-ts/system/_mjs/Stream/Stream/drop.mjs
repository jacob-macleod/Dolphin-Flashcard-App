// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Drops the specified number of elements from this stream.
 */

export function drop_(self, n) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "counterRef", () => T.toManaged(Ref.makeRef(0))), "pull", ({
    chunks,
    counterRef
  }) => {
    const go = T.chain_(chunks, chunk => T.chain_(counterRef.get, cnt => {
      if (cnt >= n) {
        return T.succeed(chunk);
      } else if (A.size(chunk) <= n - cnt) {
        return T.zipRight_(counterRef.set(cnt + A.size(chunk)), go);
      } else {
        return T.as_(counterRef.set(cnt + (n - cnt)), A.drop_(chunk, n - cnt));
      }
    }));
    return go;
  }), ({
    pull
  }) => pull));
}
/**
 * Drops the specified number of elements from this stream.
 */

export function drop(n) {
  return self => drop_(self, n);
}
//# sourceMappingURL=drop.mjs.map