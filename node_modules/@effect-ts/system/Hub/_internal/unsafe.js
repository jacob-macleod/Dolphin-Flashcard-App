"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unsafeCompletePromise = unsafeCompletePromise;
exports.unsafeOfferAll = unsafeOfferAll;
exports.unsafePollAllQueue = unsafePollAllQueue;
exports.unsafePollAllSubscription = unsafePollAllSubscription;
exports.unsafePollN = unsafePollN;
exports.unsafePublishAll = unsafePublishAll;
exports.unsafeRemove = unsafeRemove;

require("../../Operator/index.js");

var Chunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Promise/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Unsafely completes a promise with the specified value.
 */
function unsafeCompletePromise(promise, a) {
  P.unsafeDone(T.succeed(a))(promise);
}
/**
 * Unsafely offers the specified values to a queue.
 */


function unsafeOfferAll(queue, as) {
  return queue.offerAll(as);
}
/**
 * Unsafely polls all values from a queue.
 */


function unsafePollAllQueue(queue) {
  return queue.pollUpTo(Number.MAX_SAFE_INTEGER);
}
/**
 * Unsafely polls all values from a subscription.
 */


function unsafePollAllSubscription(subscription) {
  return subscription.pollUpTo(Number.MAX_SAFE_INTEGER);
}
/**
 * Unsafely polls the specified number of values from a subscription.
 */


function unsafePollN(subscription, max) {
  return subscription.pollUpTo(max);
}
/**
 * Unsafely publishes the specified values to a hub.
 */


function unsafePublishAll(hub, as) {
  return hub.publishAll(as);
}
/**
 * Unsafely removes the specified item from a queue.
 */


function unsafeRemove(queue, a) {
  unsafeOfferAll(queue, Chunk.filter_(unsafePollAllQueue(queue), _ => _ !== a));
}
//# sourceMappingURL=unsafe.js.map