"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.InterruptStatusRestoreImpl = void 0;
exports.disconnect = disconnect;
exports.interrupt = void 0;
exports.interruptAs = interruptAs;
exports.interruptible = interruptible;
exports.interruptibleMask = interruptibleMask;
exports.onInterrupt = onInterrupt;
exports.onInterruptExtended_ = onInterruptExtended_;
exports.onInterrupt_ = onInterrupt_;
exports.uninterruptible = void 0;
exports.uninterruptibleMask = uninterruptibleMask;

var Cause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Cause/core.js"));

var Fiber = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Fiber/core.js"));

var _core3 = /*#__PURE__*/require("./core.js");

var _coreScope = /*#__PURE__*/require("./core-scope.js");

var _fiberId = /*#__PURE__*/require("./fiberId.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Performs this effect uninterruptibly. This will prevent the effect from
 * being terminated externally, but the effect may fail for internal reasons
 * (e.g. an uncaught error) or terminate due to defect.
 *
 * Uninterruptible effects may recover from all failure causes (including
 * interruption of an inner effect that has been made interruptible).
 */
const uninterruptible = /*#__PURE__*/(0, _core3.interruptStatus)(Fiber.uninterruptible);
exports.uninterruptible = uninterruptible;

class InterruptStatusRestoreImpl {
  constructor(flag) {
    this.flag = flag;
    this.restore = this.restore.bind(this);
    this.force = this.force.bind(this);
  }

  restore(effect, __trace) {
    return (0, _core3.interruptStatus_)(effect, this.flag, __trace);
  }

  force(effect, __trace) {
    if (this.flag.isUninteruptible) {
      return interruptible(disconnect(uninterruptible(effect)), __trace);
    }

    return (0, _core3.interruptStatus_)(effect, this.flag, __trace);
  }

}
/**
 * Makes the effect uninterruptible, but passes it a restore function that
 * can be used to restore the inherited interruptibility from whatever region
 * the effect is composed into.
 */


exports.InterruptStatusRestoreImpl = InterruptStatusRestoreImpl;

function uninterruptibleMask(f, __trace) {
  return (0, _core3.checkInterruptible)(flag => uninterruptible(f(new InterruptStatusRestoreImpl(flag))), __trace);
}
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted.
 */


function onInterrupt_(self, cleanup, __trace) {
  return uninterruptibleMask(({
    restore
  }) => (0, _core3.foldCauseM_)(restore(self), cause => Cause.interrupted(cause) ? (0, _core3.chain_)(cleanup(Cause.interruptors(cause)), () => (0, _core3.halt)(cause)) : (0, _core3.halt)(cause), _core3.succeed, __trace));
}
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted (allows for expanding error).
 */


function onInterruptExtended_(self, cleanup, __trace) {
  return uninterruptibleMask(({
    restore
  }) => (0, _core3.foldCauseM_)(restore(self), cause => Cause.interrupted(cause) ? (0, _core3.foldCauseM_)(cleanup(Cause.interruptors(cause)), _ => (0, _core3.halt)(_), () => (0, _core3.halt)(cause)) : (0, _core3.halt)(cause), _core3.succeed, __trace));
}
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted.
 *
 * @ets_data_first onInterrupt_
 */


function onInterrupt(cleanup, __trace) {
  return self => onInterrupt_(self, cleanup, __trace);
}
/**
 * Returns an effect whose interruption will be disconnected from the
 * fiber's own interruption, being performed in the background without
 * slowing down the fiber's interruption.
 *
 * This method is useful to create "fast interrupting" effects. For
 * example, if you call this on a bracketed effect, then even if the
 * effect is "stuck" in acquire or release, its interruption will return
 * immediately, while the acquire / release are performed in the
 * background.
 *
 * See timeout and race for other applications.
 */


function disconnect(effect, __trace) {
  return uninterruptibleMask(({
    restore
  }) => (0, _core3.chain_)(_fiberId.fiberId, id => (0, _core3.chain_)((0, _coreScope.forkDaemon)(restore(effect)), fiber => onInterrupt_(restore(Fiber.join(fiber)), () => (0, _coreScope.forkDaemon)(fiber.interruptAs(id))))), __trace);
}
/**
 * Makes the effect interruptible, but passes it a restore function that
 * can be used to restore the inherited interruptibility from whatever region
 * the effect is composed into.
 */


function interruptibleMask(f, __trace) {
  return (0, _core3.checkInterruptible)(flag => interruptible(f(new InterruptStatusRestoreImpl(flag))), __trace);
}
/**
 * Returns an effect that is interrupted as if by the specified fiber.
 */


function interruptAs(fiberId, __trace) {
  return (0, _core3.haltWith)(trace => Cause.traced(Cause.interrupt(fiberId), trace()), __trace);
}
/**
 * Returns an effect that is interrupted by the current fiber
 */


const interrupt = /*#__PURE__*/(0, _core3.chain_)(_fiberId.fiberId, interruptAs);
/**
 * Returns a new effect that performs the same operations as this effect, but
 * interruptibly, even if composed inside of an uninterruptible region.
 *
 * Note that effects are interruptible by default, so this function only has
 * meaning if used within an uninterruptible region.
 *
 * WARNING: This operator "punches holes" into effects, allowing them to be
 * interrupted in unexpected places. Do not use this operator unless you know
 * exactly what you are doing. Instead, you should use `uninterruptibleMask`.
 */

exports.interrupt = interrupt;

function interruptible(effect, __trace) {
  return (0, _core3.interruptStatus_)(effect, Fiber.interruptible, __trace);
}
//# sourceMappingURL=interruption.js.map