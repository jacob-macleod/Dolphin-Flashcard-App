"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineChunks = combineChunks;
exports.combineChunks_ = combineChunks_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var CH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Channel/index.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Take/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var HO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff.js"));

var UnfoldChunkEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unfoldChunkEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Combines the chunks from this stream and the specified stream by repeatedly applying the
 * function `f` to extract a chunk using both sides and conceptually "offer"
 * it to the destination stream. `f` can maintain some internal state to control
 * the combining process, with the initial state being specified by `s`.
 */
function combineChunks_(self, that, s, f) {
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


function combineChunks(that, s, f) {
  return self => combineChunks_(self, that, s, f);
}
//# sourceMappingURL=combineChunks.js.map