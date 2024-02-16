import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
import { unfoldChunkM } from "./unfoldChunkM.mjs";
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */

export function combineChunks_(self, that, z, f) {
  return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "left", () => self.proc), "right", () => that.proc), "pull", ({
    left,
    right
  }) => unfoldChunkM(z, z => T.chain_(f(z, left, right), ex => T.optional(T.done(ex)))).proc), ({
    pull
  }) => pull));
}
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */

export function combineChunks(that, z, f) {
  return self => combineChunks_(self, that, z, f);
}
//# sourceMappingURL=combineChunks.mjs.map