"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FiberID = FiberID;
exports.None = void 0;
exports.equalsFiberID = equalsFiberID;
exports.newFiberId = newFiberId;
exports.prettyFiberId = prettyFiberId;

var _index = /*#__PURE__*/require("../Support/AtomicNumber/index.js");

// ets_tracing: off

/**
 * Constructs a Fiber ID
 */
function FiberID(startTimeMillis, seqNumber) {
  return {
    _tag: "FiberID",
    seqNumber,
    startTimeMillis
  };
}
/**
 * A sentinel value to indicate a fiber without identity.
 */


const None = /*#__PURE__*/FiberID(0, 0);
/**
 * Checks equality of Fiber IDs
 */

exports.None = None;

function equalsFiberID(x, y) {
  return x.seqNumber === y.seqNumber && x.startTimeMillis === y.startTimeMillis;
}

const _fiberCounter = /*#__PURE__*/new _index.AtomicNumber(0);
/**
 * Constructs a new Fiber ID using current time and global increment
 */


function newFiberId() {
  return FiberID(new Date().getTime(), _fiberCounter.getAndIncrement());
}
/**
 * Format a fiber id
 */


function prettyFiberId(_) {
  return `#${_.seqNumber} (started at: ${new Date(_.startTimeMillis).toISOString()})`;
}
//# sourceMappingURL=id.js.map