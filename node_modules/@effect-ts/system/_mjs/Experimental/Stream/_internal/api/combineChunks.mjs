import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as TK from "../../Take/index.mjs";
import * as C from "../core.mjs";
import * as HO from "../Handoff.mjs";
import * as UnfoldChunkEffect from "./unfoldChunkEffect.mjs";
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */

export function combineChunks_(self, that, s, f) {
  const producer = (handoff, latch) => CH.zipRight_(CH.fromEffect(HO.take(latch)), CH.readWithCause(chunk => CH.zipRight_(CH.fromEffect(HO.offer(handoff, TK.chunk(chunk))), producer(handoff, latch)), cause => CH.fromEffect(HO.offer(handoff, TK.failCause(cause))), _ => CH.zipRight_(CH.fromEffect(HO.offer(handoff, TK.end)), producer(handoff, latch))));

  return new C.Stream(CH.managed_(M.map_(M.tap_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "left", () => T.toManaged(HO.make())), "right", () => T.toManaged(HO.make())), "latchL", () => T.toManaged(HO.make())), "latchR", () => T.toManaged(HO.make())), ({
    latchL,
    left
  }) => M.fork(CH.runManaged(self.channel[">>>"](producer(left, latchL))))), ({
    latchR,
    right
  }) => M.fork(CH.runManaged(that.channel[">>>"](producer(right, latchR))))), ({
    latchL,
    latchR,
    left,
    right
  }) => Tp.tuple(left, right, latchL, latchR)), ({
    tuple: [left, right, latchL, latchR]
  }) => {
    const pullLeft = T.zipRight_(HO.offer(latchL, undefined), T.chain_(HO.take(left), TK.done));
    const pullRight = T.zipRight_(HO.offer(latchR, undefined), T.chain_(HO.take(right), TK.done));
    return UnfoldChunkEffect.unfoldChunkEffect(s, s => T.chain_(f(s, pullLeft, pullRight), _ => T.unoption(T.done(_)))).channel;
  }));
}
/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * @ets_data_first combineChunks_
 */

export function combineChunks(that, s, f) {
  return self => combineChunks_(self, that, s, f);
}
//# sourceMappingURL=combineChunks.mjs.map