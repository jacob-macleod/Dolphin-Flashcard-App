"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptWhenP = interruptWhenP;
exports.interruptWhenP_ = interruptWhenP_;

var P = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Promise/index.js"));

var InterruptWhen = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interruptWhen.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified promise is completed. If the promise is completed before the underlying channel is
 * done, then the returned channel will yield the value of the promise. Otherwise, if the
 * underlying channel finishes first, then the returned channel will yield the value of the
 * underlying channel.
 */
function interruptWhenP_(self, promise) {
  return InterruptWhen.interruptWhen_(self, P.await(promise));
}
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified promise is completed. If the promise is completed before the underlying channel is
 * done, then the returned channel will yield the value of the promise. Otherwise, if the
 * underlying channel finishes first, then the returned channel will yield the value of the
 * underlying channel.
 *
 * @ets_data_first interruptWhenP_
 */


function interruptWhenP(promise) {
  return self => interruptWhenP_(self, promise);
}
//# sourceMappingURL=interruptWhenP.js.map