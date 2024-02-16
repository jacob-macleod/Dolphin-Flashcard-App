"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.race = race;
exports.raceEither = raceEither;
exports.raceEither_ = raceEither_;
exports.raceFirst = raceFirst;
exports.raceFirst_ = raceFirst_;
exports.race_ = race_;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Either/index.js"));

var Exit = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Exit/api.js"));

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/core.js"));

var _index2 = /*#__PURE__*/require("../Function/index.js");

var _as = /*#__PURE__*/require("./as.js");

var core = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./core.js"));

var _coreScope = /*#__PURE__*/require("./core-scope.js");

var _done = /*#__PURE__*/require("./done.js");

var _interruption = /*#__PURE__*/require("./interruption.js");

var _map = /*#__PURE__*/require("./map.js");

var _mapErrorCause = /*#__PURE__*/require("./mapErrorCause.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired
 */
function race_(self, that, __trace) {
  return core.descriptorWith(descriptor => {
    const parentFiberId = descriptor.id;

    const maybeDisconnect = io => (0, _interruption.uninterruptibleMask)(interruptible => interruptible.force(io));

    return (0, _coreScope.raceWith_)(maybeDisconnect(self), maybeDisconnect(that), (exit, right) => Exit.foldM_(exit, cause => (0, _mapErrorCause.mapErrorCause_)(Fiber.join(right), _ => Cause.combinePar(cause, _)), a => (0, _as.as_)(right.interruptAs(parentFiberId), a)), (exit, left) => Exit.foldM_(exit, cause => (0, _mapErrorCause.mapErrorCause_)(Fiber.join(left), _ => Cause.combinePar(_, cause)), a => (0, _as.as_)(left.interruptAs(parentFiberId), a)), __trace);
  });
}
/**
 * Returns an effect that races this effect with the specified effect,
 * returning the first successful `A` from the faster side. If one effect
 * succeeds, the other will be interrupted. If neither succeeds, then the
 * effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @ets_data_first race_
 */


function race(that, __trace) {
  return self => race_(self, that, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 */


function raceEither_(self, that, __trace) {
  return race_((0, _map.map_)(self, E.left), (0, _map.map_)(that, E.right), __trace);
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to succeed. If neither effect succeeds, then the
 * composed effect will fail with some error.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated.
 *
 * @ets_data_first raceEither_
 */


function raceEither(that, __trace) {
  return self => raceEither_(self, that, __trace);
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 */


function raceFirst_(self, that, __trace) {
  return core.chain_(race_(core.result(self), core.result(that), __trace), a => (0, _done.done)(a));
}
/**
 * Returns an effect that races this effect with the specified effect,
 * yielding the first result to complete, whether by success or failure. If
 * neither effect completes, then the composed effect will not complete.
 *
 * WARNING: The raced effect will safely interrupt the "loser", but will not
 * resume until the loser has been cleanly terminated. If early return is
 * desired, then instead of performing `l raceFirst r`, perform
 * `l.disconnect raceFirst r.disconnect`, which disconnects left and right
 * interrupt signal, allowing a fast return, with interruption performed
 * in the background.
 *
 * @ets_data_first raceFirst_
 */


function raceFirst(that, __trace) {
  return self => raceFirst_(self, that, __trace);
}
//# sourceMappingURL=race.js.map