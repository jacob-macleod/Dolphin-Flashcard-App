// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as F from "../_internal/fiber.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as chain from "./chain.mjs";
import * as concat from "./concat.mjs";
import { Stream } from "./definitions.mjs";
import { fromChunk } from "./fromChunk.mjs";
import { fromEffect } from "./fromEffect.mjs";
import { fromEffectOption } from "./fromEffectOption.mjs";
import * as mapm from "./mapM.mjs";
import * as merge from "./merge.mjs";
import { repeatEffectOption } from "./repeatEffectOption.mjs";

function pullNonEmpty(pull) {
  return T.chain_(pull, chunk => A.isEmpty(chunk) ? pullNonEmpty(pull) : T.succeed(chunk));
}
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */


export function zipWithLatest_(self, that, f) {
  return new Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "left", () => M.map_(self.proc, pullNonEmpty)), "right", () => M.map_(that.proc, pullNonEmpty)), "pull", ({
    left,
    right
  }) => chain.chain(({
    tuple: [l, r, leftFirst]
  }) => chain.chain(latest => concat.concat(chain.chain(fromChunk)(mapm.mapM(E.fold(leftChunk => Ref.modify_(latest, ({
    tuple: [_, rightLatest]
  }) => Tp.tuple(A.map_(leftChunk, _ => f(_, rightLatest)), Tp.tuple(A.unsafeGet_(leftChunk, A.size(leftChunk) - 1), rightLatest))), rightChunk => Ref.modify_(latest, ({
    tuple: [leftLatest, _]
  }) => Tp.tuple(A.map_(rightChunk, _ => f(leftLatest, _)), Tp.tuple(leftLatest, A.unsafeGet_(rightChunk, A.size(rightChunk) - 1))))))(merge.mergeEither_(repeatEffectOption(left), repeatEffectOption(right)))))(fromChunk(leftFirst ? A.map_(r, _ => f(A.unsafeGet_(l, A.size(l) - 1), _)) : A.map_(l, _ => f(_, A.unsafeGet_(r, A.size(r) - 1))))))(fromEffect(Ref.makeRef(Tp.tuple(A.unsafeGet_(l, A.size(l) - 1), A.unsafeGet_(r, A.size(r) - 1))))))(fromEffectOption(T.raceWith_(left, right, (leftDone, rightFiber) => T.zipWith_(T.done(leftDone), F.join(rightFiber), (l, r) => Tp.tuple(l, r, true)), (rightDone, leftFiber) => T.zipWith_(T.done(rightDone), F.join(leftFiber), (r, l) => Tp.tuple(l, r, false))))).proc), ({
    pull
  }) => pull));
}
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */

export function zipWithLatest(that, f) {
  return self => zipWithLatest_(self, that, f);
}
//# sourceMappingURL=zipWithLatest.mjs.map