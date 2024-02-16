"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeWith = mergeWith;
exports.mergeWith_ = mergeWith_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Fiber/index.js"));

var _index7 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var RefM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../RefM/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff/index.js"));

var TK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 *
 * @ets_data_first mergeWith_
 */
function mergeWith(that, l, r, strategy = "Both") {
  return self => mergeWith_(self, that, l, r, strategy);
}
/**
 * Merges this stream and the specified stream together to a common element
 * type with the specified mapping functions.
 *
 * New produced stream will terminate when both specified stream terminate if
 * no termination strategy is specified.
 */


function mergeWith_(self, that, l, r, strategy = "Both") {
  return new _definitions.Stream(M.map_(M.tap_(M.tap_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "handoff", () => M.fromEffect(H.make())), "done", () => M.fromEffect(RefM.makeRefM(O.none))), "chunksL", () => self.proc), "chunksR", () => that.proc), "handler", ({
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
  }), _index7.identity))), F.interrupt)), ({
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
//# sourceMappingURL=mergeWith.js.map