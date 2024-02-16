"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithLatest = zipWithLatest;
exports.zipWithLatest_ = zipWithLatest_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var _index6 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Ref/index.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var Concat = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./concat.js"));

var FromChunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromChunk.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

var FromEffectOption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffectOption.js"));

var FromPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromPull.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

var MergeEither = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mergeEither.js"));

var RepeatEffectOption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./repeatEffectOption.js"));

var ToPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./toPull.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Zips the two streams so that when a value is emitted by either of the two streams,
 * it is combined with the latest value from the other stream to produce a result.
 *
 * Note: tracking the latest value is done on a per-chunk basis. That means that
 * emitted elements that are not the last value in chunks will never be used for zipping.
 */
function zipWithLatest_(self, that, f) {
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


function zipWithLatest(that, f) {
  return self => zipWithLatest_(self, that, f);
}
//# sourceMappingURL=zipWithLatest.js.map