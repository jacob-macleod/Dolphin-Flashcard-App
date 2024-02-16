"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCreateQueue = unsafeCreateQueue;
exports.unsafeCreateQueue_ = unsafeCreateQueue_;
exports.unsafeMakeBounded = unsafeMakeBounded;
exports.unsafeMakeDropping = unsafeMakeDropping;
exports.unsafeMakeSliding = unsafeMakeSliding;
exports.unsafeMakeUnbounded = unsafeMakeUnbounded;

var _id = /*#__PURE__*/require("../Fiber/id.js");

var _index = /*#__PURE__*/require("../Support/AtomicBoolean/index.js");

var _index2 = /*#__PURE__*/require("../Support/MutableQueue/index.js");

var _api = /*#__PURE__*/require("./api.js");

var _core = /*#__PURE__*/require("./core.js");

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./promise.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Unsafely creates a queue
 *
 * @ets_data_first unsafeCreateQueue_
 */
function unsafeCreateQueue(strategy) {
  return queue => unsafeCreateQueue_(queue, strategy);
}
/**
 * Unsafely creates a queue
 */


function unsafeCreateQueue_(queue, strategy) {
  return (0, _api.unsafeCreate)(queue, new _index2.Unbounded(), P.unsafeMake(_id.None), new _index.AtomicBoolean(false), strategy);
}
/**
 * Unsafely creates a sliding queue
 */


function unsafeMakeSliding(capacity) {
  return unsafeCreateQueue_(new _index2.Bounded(capacity), new _core.SlidingStrategy());
}
/**
 * Unsafely creates a unbounded queue
 */


function unsafeMakeUnbounded() {
  return unsafeCreateQueue_(new _index2.Unbounded(), new _core.DroppingStrategy());
}
/**
 * Unsafely creates a dropping queue
 */


function unsafeMakeDropping(capacity) {
  return unsafeCreateQueue_(new _index2.Bounded(capacity), new _core.DroppingStrategy());
}
/**
 * Unsafely creates a bounded queue
 */


function unsafeMakeBounded(capacity) {
  return unsafeCreateQueue_(new _index2.Bounded(capacity), new _api.BackPressureStrategy());
}
//# sourceMappingURL=unsafe.js.map