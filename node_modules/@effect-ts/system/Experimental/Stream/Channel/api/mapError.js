"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapError = mapError;
exports.mapError_ = mapError_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var MapErrorCause = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapErrorCause.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns a new channel, which is the same as this one, except the failure value of the returned
 * channel is created by applying the specified function to the failure value of this channel.
 */
function mapError_(self, f) {
  return MapErrorCause.mapErrorCause_(self, cause => CS.map_(cause, f));
}
/**
 * Returns a new channel, which is the same as this one, except the failure value of the returned
 * channel is created by applying the specified function to the failure value of this channel.
 *
 * @ets_data_first mapError_
 */


function mapError(f) {
  return self => mapError_(self, f);
}
//# sourceMappingURL=mapError.js.map