"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapOutEffectPar = mapOutEffectPar;
exports.mapOutEffectPar_ = mapOutEffectPar_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Fiber/index.js"));

var _index4 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Semaphore/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

var ToPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./toPull.js"));

var Unwrap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./unwrap.js"));

var ZipRight = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./zipRight.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function mapOutEffectPar_(self, n, f) {
  return Managed.managed_(M.withChildren(getChildren => M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.tap_(M.do, () => M.finalizer(T.chain_(getChildren, F.interruptAll))), "queue", () => T.toManagedRelease_(Q.makeBounded(n), Q.shutdown)), "errorSignal", () => P.makeManaged()), "permits", () => T.toManaged(SM.makeSemaphore(n))), "pull", () => ToPull.toPull(self)), ({
    errorSignal,
    permits,
    pull,
    queue
  }) => T.forkManaged(T.interruptible(T.forever(T.foldCauseM_(pull, cause => Q.offer_(queue, T.halt(cause)), E.fold(outDone => T.asUnit(T.zipRight_(T.interruptible(SM.withPermits_(T.unit, permits, n)), Q.offer_(queue, T.succeed(E.left(outDone))))), outElem => T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "latch", () => P.make()), ({
    p
  }) => Q.offer_(queue, T.map_(P.await(p), E.right))), ({
    latch,
    p
  }) => T.fork(SM.withPermit_(T.zipRight_(P.succeed_(latch, void 0), T.to_(T.tapCause_(T.raceFirst_(P.await(errorSignal), f(outElem)), _ => P.halt_(errorSignal, _)), p)), permits))), ({
    latch
  }) => P.await(latch))))))))), ({
    queue
  }) => queue)), queue => {
    const consumer = Unwrap.unwrap(T.foldCause_(T.flatten(Q.take(queue)), _ => C.failCause(_), E.fold(outDone => C.end(outDone), outElem => ZipRight.zipRight_(C.write(outElem), consumer))));
    return consumer;
  });
}
/**
 * @ets_data_first mapOutEffectPar_
 */


function mapOutEffectPar(n, f) {
  return self => mapOutEffectPar_(self, n, f);
}
//# sourceMappingURL=mapOutEffectPar.js.map