// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as E from "../../Either/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import * as F from "../../Fiber/index.mjs";
import { identity, pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as RefM from "../../RefM/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as H from "../Handoff/index.mjs";
import * as TK from "../Take/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 *
 * @ets_data_first mergeWith_
 */

export function mergeWith(that, l, r, strategy = "Both") {
  return self => mergeWith_(self, that, l, r, strategy);
}
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 */

export function mergeWith_(self, that, l, r, strategy = "Both") {
  return new Stream(M.map_(M.tap_(M.tap_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "handoff", () => M.fromEffect(H.make())), "done", () => M.fromEffect(RefM.makeRefM(O.none))), "chunksL", () => self.proc), "chunksR", () => that.proc), "handler", ({
    done,
    handoff
  }) => (pull, terminate) => T.toManagedRelease_(T.interruptible(T.fork(T.repeatWhile_(T.chain_(done.get, o => {
    if (o._tag === "Some" && o.value) {
      return T.succeed(false);
    } else {
      return T.chain_(T.result(pull), exit => RefM.modify(o => {
        const causeOrChunk = Ex.fold_(exit, c => E.left(C.sequenceCauseOption(c)), E.right);

        if (o._tag === "Some" && o.value) {
          return T.succeed(Tp.tuple(false, o));
        } else if (causeOrChunk._tag === "Right") {
          return T.as_(H.offer_(handoff, TK.chunk(causeOrChunk.right)), Tp.tuple(true, o));
        } else if (causeOrChunk._tag === "Left" && causeOrChunk.left._tag === "Some") {
          return T.as_(H.offer_(handoff, TK.halt(causeOrChunk.left.value)), Tp.tuple(false, O.some(true)));
        } else if (causeOrChunk._tag === "Left" && causeOrChunk.left._tag === "None" && (terminate || o._tag === "Some")) {
          return T.as_(H.offer_(handoff, TK.end), Tp.tuple(false, O.some(true)));
        } else {
          return T.succeed(Tp.tuple(false, O.some(false)));
        }
      })(done));
    }
  }), identity))), F.interrupt)), ({
    chunksL,
    handler
  }) => handler(T.map_(chunksL, A.map(l)), strategy === "Left" || strategy === "Either")), ({
    chunksR,
    handler
  }) => handler(T.map_(chunksR, A.map(r)), strategy === "Right" || strategy === "Either")), ({
    done,
    handoff
  }) => T.map_(T.bind_(T.bind_(T.bind_(T.do, "done", () => done.get), "take", s => s.done._tag === "Some" && s.done.value ? T.some(H.poll(handoff)) : H.take(handoff)), "result", ({
    take
  }) => TK.done(take)), ({
    result
  }) => result)));
}
//# sourceMappingURL=mergeWith.mjs.map