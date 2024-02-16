// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as F from "../../../../Fiber/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as Chain from "./chain.mjs";
import * as Concat from "./concat.mjs";
import * as FromChunk from "./fromChunk.mjs";
import * as FromEffect from "./fromEffect.mjs";
import * as FromEffectOption from "./fromEffectOption.mjs";
import * as FromPull from "./fromPull.mjs";
import * as MapEffect from "./mapEffect.mjs";
import * as MergeEither from "./mergeEither.mjs";
import * as RepeatEffectOption from "./repeatEffectOption.mjs";
import * as ToPull from "./toPull.mjs";
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */

export function zipWithLatest_(self, that, f) {
  const pullNonEmpty = pull => T.chain_(pull, chunk => CK.isEmpty(chunk) ? pullNonEmpty(pull) : T.succeed(chunk));

  return FromPull.fromPull(M.map_(M.bind_(M.chain_(M.bindAll_(M.do, () => ({
    left: M.map_(ToPull.toPull(self), pullNonEmpty),
    right: M.map_(ToPull.toPull(that), pullNonEmpty)
  })), ({
    left,
    right
  }) => M.fromEffect(T.transplant(graft => T.succeed({
    left: graft(left),
    right: graft(right)
  })))), "pull", ({
    left,
    right
  }) => ToPull.toPull(Chain.chain_(FromEffectOption.fromEffectOption(T.raceWith_(left, right, (leftDone, rightFiber) => T.zipWith_(T.done(leftDone), F.join(rightFiber), (l, r) => Tp.tuple(l, r, true)), (rightDone, leftFiber) => T.zipWith_(T.done(rightDone), F.join(leftFiber), (r, l) => Tp.tuple(l, r, false)))), ({
    tuple: [l, r, leftFirst]
  }) => Chain.chain_(FromEffect.fromEffect(Ref.makeRef(Tp.tuple(CK.unsafeGet_(l, CK.size(l) - 1), CK.unsafeGet_(r, CK.size(r) - 1)))), latest => Concat.concat_(FromChunk.fromChunk(leftFirst ? CK.map_(r, _ => f(CK.unsafeGet_(l, CK.size(l) - 1), _)) : CK.map_(l, _ => f(_, CK.unsafeGet_(r, CK.size(r) - 1)))), Chain.chain_(MapEffect.mapEffect_(MergeEither.mergeEither_(RepeatEffectOption.repeatEffectOption(left), RepeatEffectOption.repeatEffectOption(right)), E.fold(leftChunk => Ref.modify_(latest, ({
    tuple: [_, rightLatest]
  }) => Tp.tuple(CK.map_(leftChunk, _ => f(_, rightLatest)), Tp.tuple(CK.unsafeGet_(leftChunk, CK.size(leftChunk) - 1), rightLatest))), rightChunk => Ref.modify_(latest, ({
    tuple: [leftLatest, _]
  }) => Tp.tuple(CK.map_(rightChunk, _ => f(leftLatest, _)), Tp.tuple(leftLatest, CK.unsafeGet_(rightChunk, CK.size(rightChunk) - 1)))))), FromChunk.fromChunk)))))), ({
    pull
  }) => pull));
}
/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 *
 * @ets_data_first zipWithLatest_
 */

export function zipWithLatest(that, f) {
  return self => zipWithLatest_(self, that, f);
}
//# sourceMappingURL=zipWithLatest.mjs.map