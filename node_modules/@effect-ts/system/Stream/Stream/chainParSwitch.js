"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chainParSwitch = chainParSwitch;

var _index = /*#__PURE__*/require("../../Function/index.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Semaphore/index.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Stream/Pull/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/fiber.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./forEach.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Maps each element of this stream to another stream and returns the non-deterministic merge
 * of those streams, executing up to `n` inner streams concurrently. When a new stream is created
 * from an element of the source stream, the oldest executing stream is cancelled. Up to `bufferSize`
 * elements of the produced streams may be buffered in memory by this operator.
 */
function chainParSwitch(n, f, bufferSize = 16) {
  return self => {
    return new _definitions.Stream(M.withChildren(getChildren => M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "out", () => T.toManagedRelease_(Q.makeBounded(bufferSize), Q.shutdown)), "permits", () => T.toManaged(SM.makeSemaphore(n))), "innerFailure", () => T.toManaged(P.make())), "cancelers", () => T.toManagedRelease_(Q.makeBounded(n), Q.shutdown)), ({
      cancelers,
      innerFailure,
      out,
      permits
    }) => M.fork(M.foldCauseM_(forEach.forEachManaged_(self, a => T.asUnit(T.tap_(T.tap_(T.let_(T.tap_(T.tap_(T.bind_(T.bind_(T.bind_(T.do, "canceler", () => P.make()), "latch", () => P.make()), "size", () => Q.size(cancelers)), ({
      size
    }) => {
      if (size < n) {
        return T.unit;
      } else {
        return T.chain_(Q.take(cancelers), _ => P.succeed_(_, undefined));
      }
    }), ({
      canceler
    }) => Q.offer_(cancelers, canceler)), "innerStream", ({
      latch
    }) => M.use_(M.tap_(SM.withPermitManaged(permits), _ => T.toManaged(P.succeed_(latch, undefined))), () => T.foldCauseM_(forEach.forEachChunk(o2s => Q.offer_(out, T.succeed(o2s)))(f(a)), cause => T.zipRight_(Q.offer_(out, Pull.halt(cause)), P.fail_(innerFailure, cause)), _ => T.unit))), ({
      canceler,
      innerStream
    }) => T.fork(T.race_(innerStream, P.await(canceler)))), ({
      latch
    }) => P.await(latch)))), cause => T.toManaged(T.zipRight_(T.chain_(getChildren, _ => F.interruptAll(_)), Q.offer_(out, Pull.halt(cause)))), _ => T.toManaged(T.raceWith_(P.await(innerFailure), SM.withPermits_(T.unit, permits, n), (_, permitAcquisition) => T.zipRight_(T.chain_(getChildren, F.interruptAll), T.asUnit(F.interrupt(permitAcquisition))), (_, failureAwait) => T.zipRight_(Q.offer_(out, Pull.end), F.interrupt(failureAwait))))))), ({
      out
    }) => T.flatten(Q.take(out)))));
  };
}
//# sourceMappingURL=chainParSwitch.js.map