"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.catchAll = catchAll;
exports.catchAll_ = catchAll_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 */
function catchAll_(self, f) {
  return C.catchAllCause_(self, cause => E.fold_(CS.failureOrCause(cause), l => f(l), r => C.failCause(r)));
}
/**
 * Returns a new channel that is the same as this one, except if this channel errors for any
 * typed error, then the returned channel will switch over to using the fallback channel returned
 * by the specified error handler.
 *
 * @ets_data_first catchAll_
 */


function catchAll(f) {
  return self => catchAll_(self, f);
}
//# sourceMappingURL=catchAll.js.map