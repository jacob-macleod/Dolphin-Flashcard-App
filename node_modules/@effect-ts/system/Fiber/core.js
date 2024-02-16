"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Descriptor = void 0;
Object.defineProperty(exports, "FiberID", {
  enumerable: true,
  get: function () {
    return _id.FiberID;
  }
});
exports.InterruptStatus = void 0;
Object.defineProperty(exports, "None", {
  enumerable: true,
  get: function () {
    return _id.None;
  }
});
exports.Synthetic = void 0;
Object.defineProperty(exports, "equalsFiberID", {
  enumerable: true,
  get: function () {
    return _id.equalsFiberID;
  }
});
exports.interruptible = exports.interruptStatus = void 0;
exports.join = join;
Object.defineProperty(exports, "newFiberId", {
  enumerable: true,
  get: function () {
    return _id.newFiberId;
  }
});
exports.uninterruptible = void 0;

var _core = /*#__PURE__*/require("../Effect/core.js");

var _done = /*#__PURE__*/require("../Effect/done.js");

var _tap = /*#__PURE__*/require("../Effect/tap.js");

var _id = /*#__PURE__*/require("./id.js");

// ets_tracing: off

/**
 * A record containing information about a `Fiber`.
 *
 * @param id            The fiber's unique identifier
 * @param interruptors  The set of fibers attempting to interrupt the fiber or its ancestors.
 * @param children      The fiber's forked children.
 */
class Descriptor {
  constructor(id, status, interruptors, interruptStatus, scope) {
    this.id = id;
    this.status = status;
    this.interruptors = interruptors;
    this.interruptStatus = interruptStatus;
    this.scope = scope;
  }

}

exports.Descriptor = Descriptor;

class Synthetic {
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


exports.Synthetic = Synthetic;

class InterruptStatus {
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


exports.InterruptStatus = InterruptStatus;
const interruptible = /*#__PURE__*/new InterruptStatus(true);
/**
 * Uninterruptible region
 */

exports.interruptible = interruptible;
const uninterruptible = /*#__PURE__*/new InterruptStatus(false);
/**
 * Create InterruptStatus from a boolean value
 */

exports.uninterruptible = uninterruptible;

const interruptStatus = b => b ? interruptible : uninterruptible;
/**
 * Joins the fiber, which suspends the joining fiber until the result of the
 * fiber has been determined. Attempting to join a fiber that has erred will
 * result in a catchable error. Joining an interrupted fiber will result in an
 * "inner interruption" of this fiber, unlike interruption triggered by another
 * fiber, "inner interruption" can be caught and recovered.
 */


exports.interruptStatus = interruptStatus;

function join(fiber) {
  return (0, _tap.tap_)((0, _core.chain_)(fiber.await, _done.done), () => fiber.inheritRefs);
}
//# sourceMappingURL=core.js.map