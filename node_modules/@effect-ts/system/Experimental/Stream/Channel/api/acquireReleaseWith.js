"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acquireReleaseWith = acquireReleaseWith;
exports.acquireReleaseWith_ = acquireReleaseWith_;

var AcquireReleaseExitWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./acquireReleaseExitWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function acquireReleaseWith_(acquire, use, release) {
  return AcquireReleaseExitWith.acquireReleaseExitWith_(acquire, use, (a, _) => release(a));
}
/**
 * @ets_data_first acquireReleaseWith_
 */


function acquireReleaseWith(use, release) {
  return acquire => acquireReleaseWith_(acquire, use, release);
}
//# sourceMappingURL=acquireReleaseWith.js.map