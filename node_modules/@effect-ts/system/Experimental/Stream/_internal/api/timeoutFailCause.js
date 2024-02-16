"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutFailCause = timeoutFailCause;
exports.timeoutFailCause_ = timeoutFailCause_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var FromPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromPull.js"));

var ToPull = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./toPull.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Fails the stream with given cause if it does not produce a value after d duration.
 */
function timeoutFailCause_(self, cause, d) {
  return FromPull.fromPull(M.map_(ToPull.toPull(self), pull => T.timeoutFailCause_(pull, () => CS.map_(cause, _ => O.some(_)), d)));
}
/**
 * Fails the stream with given cause if it does not produce a value after d duration.
 *
 * @ets_data_first timeoutFailCause_
 */


function timeoutFailCause(cause, d) {
  return self => timeoutFailCause_(self, cause, d);
}
//# sourceMappingURL=timeoutFailCause.js.map