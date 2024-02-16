"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainPar = chainPar;

var _index = /*#__PURE__*/require("../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Semaphore/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/fiber.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./forEach.js"));

var _managed2 = /*#__PURE__*/require("./managed.js");

var tap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./tap.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Maps each element of this stream to another stream and returns the
 * non-deterministic merge of those streams, executing up to `n` inner streams
 * concurrently. Up to `outputBuffer` elements of the produced streams may be
 * buffered in memory by this operator.
 */
function chainPar(n, outputBuffer = 16) {
  return f => self => {
    return new _definitions.Stream(M.withChildren(getChildren => M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "out", () => T.toManagedRelease_(Q.makeBounded(outputBuffer), Q.shutdown)), "permits", () => T.toManaged(SM.makeSemaphore(n))), "innerFailure", () => T.toManaged(P.make())), ({
      innerFailure,
      out,
      permits
    }) => M.fork(M.foldCauseM_(forEach.forEachManaged_(self, a => T.asUnit(T.tap_(T.tap_(T.let_(T.bind_(T.do, "latch", () => P.make()), "innerStream", ({
      latch
    }) => T.foldCauseM_(forEach.forEachChunk(b => T.asUnit(Q.offer_(out, T.succeed(b))))(chain.chain(_ => f(a))(tap.tap(_ => P.succeed_(latch, undefined))((0, _managed2.managed)(SM.withPermitManaged(permits))))), cause => T.asUnit(T.zipRight_(Q.offer_(out, Pull.halt(cause)), P.fail_(innerFailure, cause))), _ => T.unit)), ({
      innerStream
    }) => T.fork(innerStream)), ({
      latch
    }) => P.await(latch)))), cause => T.toManaged(T.zipRight_(T.chain_(getChildren, c => F.interruptAll(c)), T.asUnit(Q.offer_(out, Pull.halt(cause))))), _ => T.toManaged(T.raceWith_(T.interruptible(P.await(innerFailure)), SM.withPermits_(T.interruptible(T.unit), permits, n), (_, permitsAcquisition) => T.zipRight_(T.chain_(getChildren, c => F.interruptAll(c)), T.asUnit(F.interrupt(permitsAcquisition))), (_, failureAwait) => T.zipRight_(Q.offer_(out, Pull.end), T.asUnit(F.interrupt(failureAwait)))))))), ({
      out
    }) => T.flatten(Q.take(out)))));
  };
}
//# sourceMappingURL=chainPar.js.map