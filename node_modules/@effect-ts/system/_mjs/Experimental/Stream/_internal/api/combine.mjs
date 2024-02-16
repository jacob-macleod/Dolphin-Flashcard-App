// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
import * as HO from "../Handoff.mjs";
import * as UnfoldEffect from "./unfoldEffect.mjs";
/**
 * Combines the elements from this stream and the specified stream by repeatedly applying the
 * function `f` to extract an element using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 *
 * Where possible, prefer `Stream#combineChunks` for a more efficient implementation.
 */

export function combine_(self, that, s, f) {
  const producer = (handoff, latch) => CH.zipRight_(CH.fromEffect(HO.take(latch)), CH.readWithCause(value => CH.zipRight_(CH.fromEffect(HO.offer(handoff, Ex.succeed(value))), producer(handoff, latch)), cause => CH.fromEffect(HO.offer(handoff, Ex.failCause(CS.map_(cause, O.some)))), _ => CH.zipRight_(CH.fromEffect(HO.offer(handoff, Ex.fail(O.none))), producer(handoff, latch))));

  return new C.Stream(CH.managed_(M.map_(M.tap_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "left", () => T.toManaged(HO.make())), "right", () => T.toManaged(HO.make())), "latchL", () => T.toManaged(HO.make())), "latchR", () => T.toManaged(HO.make())), ({
    latchL,
    left
  }) => M.fork(CH.runManaged(CH.concatMap_(self.channel, _ => CH.writeChunk(_))[">>>"](producer(left, latchL))))), ({
    latchR,
    right
  }) => M.fork(CH.runManaged(CH.concatMap_(that.channel, _ => CH.writeChunk(_))[">>>"](producer(right, latchR))))), ({
    latchL,
    latchR,
    left,
    right
  }) => Tp.tuple(left, right, latchL, latchR)), ({
    tuple: [left, right, latchL, latchR]
  }) => {
    const pullLeft = T.zipRight_(HO.offer(latchL, undefined), T.chain_(HO.take(left), T.done));
    const pullRight = T.zipRight_(HO.offer(latchR, undefined), T.chain_(HO.take(right), T.done));
    return UnfoldEffect.unfoldEffect(s, s => T.chain_(f(s, pullLeft, pullRight), _ => T.unoption(T.done(_)))).channel;
  }));
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