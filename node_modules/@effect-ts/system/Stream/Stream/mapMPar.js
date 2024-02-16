"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapMPar = mapMPar;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Semaphore/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var Pull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Pull/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _forEach = /*#__PURE__*/require("./forEach.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. Transformed elements
 * will be emitted in the original order.
 */
function mapMPar(n) {
  return f => self => new _definitions.Stream(M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.do, "out", () => M.fromEffect(Q.makeBounded(n))), "errorSignal", () => M.fromEffect(P.make())), "permits", () => M.fromEffect(SM.makeSemaphore(n))), ({
    errorSignal,
    out,
    permits
  }) => M.fork(M.foldCauseM_((0, _forEach.forEachManaged)(a => T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "latch", () => P.make()), ({
    p
  }) => Q.offer_(out, T.mapError_(P.await(p), O.some))), ({
    latch,
    p
  }) => T.fork(SM.withPermit_(T.chain_( // Make sure we start evaluation before moving on to the next element
  P.succeed(undefined)(latch), () => // Transfer the result to the consuming stream
  T.to_( // Notify other tasks of a failure
  T.tapCause_( // Interrupt evaluation if another task fails
  T.raceFirst_(P.await(errorSignal), f(a)), e => P.halt(e)(errorSignal)), p)), permits))), ({
    latch
  }) => P.await(latch))))(self), c => M.fromEffect(Q.offer_(out, Pull.halt(c))), () => M.fromEffect(T.chain_(SM.withPermits_(T.unit, permits, n), () => Q.offer_(out, Pull.end)))))), ({
    out
  }) => T.map_(T.flatten(Q.take(out)), o => A.single(o))));
}
//# sourceMappingURL=mapMPar.js.map