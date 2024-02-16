"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zipWithLatest = zipWithLatest;
exports.zipWithLatest_ = zipWithLatest_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/fiber.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var concat = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./concat.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _fromChunk = /*#__PURE__*/require("./fromChunk.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

var _fromEffectOption = /*#__PURE__*/require("./fromEffectOption.js");

var mapm = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapM.js"));

var merge = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./merge.js"));

var _repeatEffectOption = /*#__PURE__*/require("./repeatEffectOption.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
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


function zipWithLatest_(self, that, f) {
  return new _definitions.Stream(M.map_(M.bind_(M.bind_(M.bind_(M.do, "left", () => M.map_(self.proc, pullNonEmpty)), "right", () => M.map_(that.proc, pullNonEmpty)), "pull", ({
    left,
    right
  }) => chain.chain(({
    tuple: [l, r, leftFirst]
  }) => chain.chain(latest => concat.concat(chain.chain(_fromChunk.fromChunk)(mapm.mapM(E.fold(leftChunk => Ref.modify_(latest, ({
    tuple: [_, rightLatest]
  }) => Tp.tuple(A.map_(leftChunk, _ => f(_, rightLatest)), Tp.tuple(A.unsafeGet_(leftChunk, A.size(leftChunk) - 1), rightLatest))), rightChunk => Ref.modify_(latest, ({
    tuple: [leftLatest, _]
  }) => Tp.tuple(A.map_(rightChunk, _ => f(leftLatest, _)), Tp.tuple(leftLatest, A.unsafeGet_(rightChunk, A.size(rightChunk) - 1))))))(merge.mergeEither_((0, _repeatEffectOption.repeatEffectOption)(left), (0, _repeatEffectOption.repeatEffectOption)(right)))))((0, _fromChunk.fromChunk)(leftFirst ? A.map_(r, _ => f(A.unsafeGet_(l, A.size(l) - 1), _)) : A.map_(l, _ => f(_, A.unsafeGet_(r, A.size(r) - 1))))))((0, _fromEffect.fromEffect)(Ref.makeRef(Tp.tuple(A.unsafeGet_(l, A.size(l) - 1), A.unsafeGet_(r, A.size(r) - 1))))))((0, _fromEffectOption.fromEffectOption)(T.raceWith_(left, right, (leftDone, rightFiber) => T.zipWith_(T.done(leftDone), F.join(rightFiber), (l, r) => Tp.tuple(l, r, true)), (rightDone, leftFiber) => T.zipWith_(T.done(rightDone), F.join(leftFiber), (r, l) => Tp.tuple(l, r, false))))).proc), ({
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


function zipWithLatest(that, f) {
  return self => zipWithLatest_(self, that, f);
}
//# sourceMappingURL=zipWithLatest.js.map