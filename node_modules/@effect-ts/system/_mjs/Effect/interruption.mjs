// ets_tracing: off
import * as Cause from "../Cause/core.mjs";
import * as Fiber from "../Fiber/core.mjs";
import { interruptible as statusInterruptible, uninterruptible as statusUninterruptible } from "../Fiber/core.mjs";
import { chain_, checkInterruptible, foldCauseM_, halt, haltWith, interruptStatus, interruptStatus_, succeed } from "./core.mjs";
import { forkDaemon } from "./core-scope.mjs";
import { fiberId } from "./fiberId.mjs";
/**
 * Performs this effect uninterruptibly. This will prevent the effect from
 * being terminated externally, but the effect may fail for internal reasons
 * (e.g. an uncaught error) or terminate due to defect.
 *
 * Uninterruptible effects may recover from all failure causes (including
 * interruption of an inner effect that has been made interruptible).
 */

export const uninterruptible = /*#__PURE__*/interruptStatus(statusUninterruptible);
export class InterruptStatusRestoreImpl {
  constructor(flag) {
    this.flag = flag;
    this.restore = this.restore.bind(this);
    this.force = this.force.bind(this);
  }

  restore(effect, __trace) {
    return interruptStatus_(effect, this.flag, __trace);
  }

  force(effect, __trace) {
    if (this.flag.isUninteruptible) {
      return interruptible(disconnect(uninterruptible(effect)), __trace);
    }

    return interruptStatus_(effect, this.flag, __trace);
  }

}
/**
 * Makes the effect uninterruptible, but passes it a restore function that
 * can be used to restore the inherited interruptibility from whatever region
 * the effect is composed into.
 */

export function uninterruptibleMask(f, __trace) {
  return checkInterruptible(flag => uninterruptible(f(new InterruptStatusRestoreImpl(flag))), __trace);
}
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted.
 */

export function onInterrupt_(self, cleanup, __trace) {
  return uninterruptibleMask(({
    restore
  }) => foldCauseM_(restore(self), cause => Cause.interrupted(cause) ? chain_(cleanup(Cause.interruptors(cause)), () => halt(cause)) : halt(cause), succeed, __trace));
}
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted (allows for expanding error).
 */

export function onInterruptExtended_(self, cleanup, __trace) {
  return uninterruptibleMask(({
    restore
  }) => foldCauseM_(restore(self), cause => Cause.interrupted(cause) ? foldCauseM_(cleanup(Cause.interruptors(cause)), _ => halt(_), () => halt(cause)) : halt(cause), succeed, __trace));
}
/**
 * Calls the specified function, and runs the effect it returns, if this
 * effect is interrupted.
 *
 * @ets_data_first onInterrupt_
 */

export function onInterrupt(cleanup, __trace) {
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

export function disconnect(effect, __trace) {
  return uninterruptibleMask(({
    restore
  }) => chain_(fiberId, id => chain_(forkDaemon(restore(effect)), fiber => onInterrupt_(restore(Fiber.join(fiber)), () => forkDaemon(fiber.interruptAs(id))))), __trace);
}
/**
 * Makes the effect interruptible, but passes it a restore function that
 * can be used to restore the inherited interruptibility from whatever region
 * the effect is composed into.
 */

export function interruptibleMask(f, __trace) {
  return checkInterruptible(flag => interruptible(f(new InterruptStatusRestoreImpl(flag))), __trace);
}
/**
 * Returns an effect that is interrupted as if by the specified fiber.
 */

export function interruptAs(fiberId, __trace) {
  return haltWith(trace => Cause.traced(Cause.interrupt(fiberId), trace()), __trace);
}
/**
 * Returns an effect that is interrupted by the current fiber
 */

export const interrupt = /*#__PURE__*/chain_(fiberId, interruptAs);
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

export function interruptible(effect, __trace) {
  return interruptStatus_(effect, statusInterruptible, __trace);
}
//# sourceMappingURL=interruption.mjs.map