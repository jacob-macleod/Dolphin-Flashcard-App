"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAllWith = mergeAllWith;
exports.mergeAllWith_ = mergeAllWith_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var _index4 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Ref/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Semaphore/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

var ToPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./toPull.js"));

var Unwrap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrap.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function mergeAllWith_(channels, n, f, bufferSize = 16, mergeStrategy = "BackPressure") {
  return Managed.managed_(M.withChildren(getChildren => M.map_(M.tap_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.tap_(M.do, () => M.finalizer(T.chain_(getChildren, F.interruptAll))), "queue", () => T.toManagedRelease_(Q.makeBounded(bufferSize), Q.shutdown)), "cancelers", () => T.toManagedRelease_(Q.makeUnbounded(), Q.shutdown)), "lastDone", () => Ref.makeManagedRef(O.none)), "errorSignal", () => P.makeManaged()), "permits", () => T.toManaged(SM.makeSemaphore(n))), "pull", () => ToPull.toPull(channels)), "evaluatePull", ({
    errorSignal,
    lastDone,
    queue
  }) => pull => T.catchAllCause_(T.chain_(T.repeatUntil_(T.chain_(pull, E.fold(done => T.succeed(O.some(done)), outElem => T.as_(Q.offer_(queue, T.succeed(E.right(outElem))), O.none))), O.isSome), O.fold(() => T.unit, outDone => Ref.update_(lastDone, O.fold(() => O.some(outDone), lastDone => O.some(f(lastDone, outDone)))))), cause => T.zipRight_(Q.offer_(queue, T.halt(cause)), T.asUnit(P.succeed_(errorSignal, undefined))))), ({
    cancelers,
    errorSignal,
    evaluatePull,
    lastDone,
    permits,
    pull,
    queue
  }) => T.forkManaged(T.repeatWhile_(T.foldCauseM_(pull, cause => T.zipRight_(T.chain_(getChildren, F.interruptAll), T.as_(Q.offer_(queue, T.halt(cause)), false)), E.fold(outDone => T.raceWith_(P.await(errorSignal), SM.withPermits_(T.unit, permits, n), (_, permitAcquisition) => T.zipRight_(T.chain_(getChildren, F.interruptAll), T.as_(F.interrupt(permitAcquisition), false)), (_, failureAwait) => T.zipRight_(F.interrupt(failureAwait), T.as_(T.chain_(lastDone.get, O.fold(() => Q.offer_(queue, T.succeed(E.left(outDone))), lastDone => Q.offer_(queue, T.succeed(E.left(f(lastDone, outDone)))))), false))), channel => {
    if (mergeStrategy === "BackPressure") {
      return T.map_(T.bind_(T.tap_(T.tap_(T.let_(T.bind_(T.do, "latch", () => P.make()), "raceIOs", () => M.use_(ToPull.toPull(channel), _ => T.race_(evaluatePull(_), P.await(errorSignal)))), ({
        latch,
        raceIOs
      }) => T.fork(SM.withPermit_(T.zipRight_(P.succeed_(latch, undefined), raceIOs), permits))), ({
        latch
      }) => P.await(latch)), "errored", () => P.isDone(errorSignal)), ({
        errored
      }) => !errored);
    } else {
      return T.map_(T.bind_(T.tap_(T.tap_(T.let_(T.tap_(T.tap_(T.bind_(T.bind_(T.bind_(T.do, "canceler", () => P.make()), "latch", () => P.make()), "size", () => Q.size(cancelers)), ({
        size
      }) => T.when_(T.chain_(Q.take(cancelers), _ => P.succeed_(_, undefined)), () => size >= n)), ({
        canceler
      }) => Q.offer_(cancelers, canceler)), "raceIOs", ({
        canceler
      }) => M.use_(ToPull.toPull(channel), _ => T.race_(T.race_(evaluatePull(_), P.await(errorSignal)), P.await(canceler)))), ({
        latch,
        raceIOs
      }) => T.fork(SM.withPermit_(T.zipRight_(P.succeed_(latch, undefined), raceIOs), permits))), ({
        latch
      }) => P.await(latch)), "errored", () => P.isDone(errorSignal)), ({
        errored
      }) => !errored);
    }
  })), x => x === true))), ({
    queue
  }) => queue)), queue => {
    const consumer = Unwrap.unwrap(T.foldCause_(T.flatten(Q.take(queue)), cause => C.failCause(cause), E.fold(outDone => C.end(outDone), outElem => ZipRight.zipRight_(C.write(outElem), consumer))));
    return consumer;
  });
}
/**
 * @ets_data_first mergeAllWith_
 */


function mergeAllWith(n, f, bufferSize = 16, mergeStrategy = "BackPressure") {
  return channels => mergeAllWith_(channels, n, f, bufferSize, mergeStrategy);
}
//# sourceMappingURL=mergeAllWith.js.map