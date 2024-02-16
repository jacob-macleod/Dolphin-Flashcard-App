// ets_tracing: off
import { chain_ } from "../Effect/core.mjs";
import { done } from "../Effect/done.mjs";
import { tap_ } from "../Effect/tap.mjs";
export { equalsFiberID, FiberID, newFiberId, None } from "./id.mjs";
/**
 * A record containing information about a `Fiber`.
 *
 * @param id            The fiber's unique identifier
 * @param interruptors  The set of fibers attempting to interrupt the fiber or its ancestors.
 * @param children      The fiber's forked children.
 */

export class Descriptor {
  constructor(id, status, interruptors, interruptStatus, scope) {
    this.id = id;
    this.status = status;
    this.interruptors = interruptors;
    this.interruptStatus = interruptStatus;
    this.scope = scope;
  }

}
export class Synthetic {
  constructor(_await, getRef, inheritRefs, interruptAs, poll) {
    this.getRef = getRef;
    this.inheritRefs = inheritRefs;
    this.interruptAs = interruptAs;
    this.poll = poll;
    this._tag = "SyntheticFiber";
    this.await = _await;
  }

}
/**
 * InterruptStatus tracks interruptability of the current stack region
 */

export class InterruptStatus {
  constructor(isInterruptible) {
    this.isInterruptible = isInterruptible;
  }

  get isUninteruptible() {
    return !this.isInterruptible;
  }

  get toBoolean() {
    return this.isInterruptible;
  }

}
/**
 * Interruptible region
 */

export const interruptible = /*#__PURE__*/new InterruptStatus(true);
/**
 * Uninterruptible region
 */

export const uninterruptible = /*#__PURE__*/new InterruptStatus(false);
/**
 * Create InterruptStatus from a boolean value
 */

export const interruptStatus = b => b ? interruptible : uninterruptible;
/**
 * Joins the fiber, which suspends the joining fiber until the result of the
 * fiber has been determined. Attempting to join a fiber that has erred will
 * result in a catchable error. Joining an interrupted fiber will result in an
 * "inner interruption" of this fiber, unlike interruption triggered by another
 * fiber, "inner interruption" can be caught and recovered.
 */

export function join(fiber) {
  return tap_(chain_(fiber.await, done), () => fiber.inheritRefs);
}
//# sourceMappingURL=core.mjs.map