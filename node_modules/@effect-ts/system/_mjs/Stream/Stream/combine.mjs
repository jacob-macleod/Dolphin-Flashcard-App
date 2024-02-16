import { pipe } from "../../Function/index.mjs";
import * as BP from "../../Stream/BufferedPull/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
import { unfoldM } from "./unfoldM.mjs";
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 */

export function combine_(self, that, s, f) {
  return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "left", () => M.mapM_(self.proc, _ => BP.make(_))), "right", () => M.mapM_(that.proc, _ => BP.make(_))), "pull", ({
    left,
    right
  }) => unfoldM(s, s => T.chain_(f(s, BP.pullElement(left), BP.pullElement(right)), _ => T.optional(T.done(_)))).proc), ({
    pull
  }) => pull));
}
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 *
 * @ets_data_first combine_
 */

export function combine(that, s, f) {
  return self => combine_(self, that, s, f);
}
//# sourceMappingURL=combine.mjs.map