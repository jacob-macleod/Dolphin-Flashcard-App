// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
import { empty } from "./empty.mjs";
/**
 * Takes the specified number of elements from this stream.
 */

export function take_(self, n) {
  if (n <= 0) {
    return empty;
  } else {
    return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "chunks", () => self.proc), "counterRef", () => T.toManaged(Ref.makeRef(0))), "pull", ({
      chunks,
      counterRef
    }) => T.chain_(counterRef.get, cnt => {
      if (cnt >= n) {
        return Pull.end;
      } else {
        return T.map_(T.tap_(T.let_(T.bind_(T.do, "chunk", () => chunks), "taken", ({
          chunk
        }) => {
          if (A.size(chunk) <= n - cnt) {
            return chunk;
          } else {
            return A.take_(chunk, n - cnt);
          }
        }), ({
          taken
        }) => counterRef.set(cnt + A.size(taken))), ({
          taken
        }) => taken);
      }
    })), ({
      pull
    }) => pull));
  }
}
/**
 * Takes the specified number of elements from this stream.
 */

export function take(n) {
  return self => take_(self, n);
}
//# sourceMappingURL=take.mjs.map