"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAll = mergeAll;
exports.mergeAll_ = mergeAll_;

var MergeAllWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mergeAllWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function mergeAll_(channels, n, bufferSize = 16, mergeStrategy = "BackPressure") {
  return MergeAllWith.mergeAllWith_(channels, n, (_, __) => void 0, bufferSize, mergeStrategy);
}
/**
 * @ets_data_first mergeAll_
 */


function mergeAll(n, bufferSize = 16, mergeStrategy = "BackPressure") {
  return channels => mergeAll_(channels, n, bufferSize, mergeStrategy);
}
//# sourceMappingURL=mergeAll.js.map