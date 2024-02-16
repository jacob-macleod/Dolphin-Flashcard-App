"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interruptWhen = interruptWhen;
exports.interruptWhen_ = interruptWhen_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var MH = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/mergeHelpers.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var MergeWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mergeWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified effect completes. If the effect completes successfully before the underlying channel
 * is done, then the returned channel will yield the success value of the effect as its terminal
 * value. On the other hand, if the underlying channel finishes first, then the returned channel
 * will yield the success value of the underlying channel as its terminal value.
 */
function interruptWhen_(self, io) {
  return MergeWith.mergeWith_(self, C.fromEffect(io), selfDone => MH.done(T.done(selfDone)), ioDone => MH.done(T.done(ioDone)));
}
/**
 * Returns a new channel, which is the same as this one, except it will be interrupted when the
 * specified effect completes. If the effect completes successfully before the underlying channel
 * is done, then the returned channel will yield the success value of the effect as its terminal
 * value. On the other hand, if the underlying channel finishes first, then the returned channel
 * will yield the success value of the underlying channel as its terminal value.
 *
 * @ets_data_first interruptWhen_
 */


function interruptWhen(io) {
  return self => interruptWhen_(self, io);
}
//# sourceMappingURL=interruptWhen.js.map