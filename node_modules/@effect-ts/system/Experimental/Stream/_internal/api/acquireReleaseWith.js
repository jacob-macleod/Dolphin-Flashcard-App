"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acquireReleaseWith = acquireReleaseWith;
exports.acquireReleaseWith_ = acquireReleaseWith_;

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var Managed = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./managed.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 */
function acquireReleaseWith_(acquire, release) {
  return Managed.managed(M.make_(acquire, release));
}
/**
 * Creates a stream from a single value that will get cleaned up after the
 * stream is consumed
 *
 * @ets_data_first acquireReleaseWith_
 */


function acquireReleaseWith(release) {
  return acquire => acquireReleaseWith_(acquire, release);
}
//# sourceMappingURL=acquireReleaseWith.js.map