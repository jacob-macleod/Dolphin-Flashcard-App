"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.raceAll = raceAll;
exports.raceAllWait = raceAllWait;
exports.raceAllWithStrategy = raceAllWithStrategy;

var _reduce = /*#__PURE__*/require("../Collections/Immutable/Chunk/api/reduce.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/index.js"));

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/index.js"));

var _index4 = /*#__PURE__*/require("../Function/index.js");

var _await = /*#__PURE__*/require("../Promise/await.js");

var _halt = /*#__PURE__*/require("../Promise/halt.js");

var _make = /*#__PURE__*/require("../Promise/make.js");

var _succeed = /*#__PURE__*/require("../Promise/succeed.js");

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Ref/index.js"));

var as = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./as.js"));

var asUnit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./asUnit.js"));

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var Do = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./do.js"));

var _exclForEach = /*#__PURE__*/require("./excl-forEach.js");

var _flatten = /*#__PURE__*/require("./flatten.js");

var interruption = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruption.js"));

var map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var tap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./tap.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function arbiter(fibers, winner, promise, fails) {
  return res => Exit.foldM(e => (0, _flatten.flatten)(Ref.modify_(fails, c => Tp.tuple(c === 0 ? asUnit.asUnit((0, _halt.halt)(e)(promise)) : core.unit, c - 1))), a => core.chain_((0, _succeed.succeed)(Tp.tuple(a, winner))(promise), set => set ? (0, _reduce.reduce)(core.unit, (io, f) => f === winner ? io : tap.tap_(io, () => Fiber.interrupt(f)))(fibers) : core.unit))(res);
}
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */


function raceAllWithStrategy(ios, interruptStrategy, __trace) {
  return map.map_(tap.tap_(Do.bind_(Do.bind_(Do.bind_(Do.do, "done", () => (0, _make.make)()), "fails", () => Ref.makeRef(ios.length)), "c", ({
    done,
    fails
  }) => interruption.uninterruptibleMask(({
    restore
  }) => map.map_(Do.bind_(Do.let_(tap.tap_(Do.bind_(Do.do, "fs", () => (0, _exclForEach.forEach_)(ios, x => core.fork(interruption.interruptible(x)))), ({
    fs
  }) => (0, _reduce.reduce_)(fs, core.unit, (io, f) => core.chain_(io, () => core.fork(core.chain_(f.await, arbiter(fs, f, done, fails)))))), "inheritRefs", () => res => as.as_(res.get(1).inheritRefs, res.get(0))), "c", ({
    fs,
    inheritRefs
  }) => interruption.onInterrupt_(restore(core.chain_((0, _await.await)(done), inheritRefs)), () => (0, _reduce.reduce_)(fs, core.unit, (io, f) => tap.tap_(io, () => Fiber.interrupt(f))))), ({
    c,
    fs
  }) => ({
    c,
    fs
  })), __trace)), ({
    c: {
      fs
    }
  }) => interruptStrategy === "wait" ? (0, _exclForEach.forEach_)(fs, f => f.await) : core.unit), ({
    c: {
      c
    }
  }) => c);
}
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */


function raceAll(ios, __trace) {
  return raceAllWithStrategy(ios, "background", __trace);
}
/**
 * Returns an effect that races this effect with all the specified effects,
 * yielding the value of the first effect to succeed with a value.
 * Losers of the race will be interrupted immediately.
 *
 * Note: in case of success eventual interruption errors are ignored
 */


function raceAllWait(ios, __trace) {
  return raceAllWithStrategy(ios, "wait", __trace);
}
//# sourceMappingURL=raceAll.js.map