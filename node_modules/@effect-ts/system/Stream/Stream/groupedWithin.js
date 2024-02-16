"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupedWithin = groupedWithin;
exports.groupedWithin_ = groupedWithin_;

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var TR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Transducer/index.js"));

var _aggregateAsyncWithin = /*#__PURE__*/require("./aggregateAsyncWithin.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */
function groupedWithin_(self, chunkSize, within) {
  return (0, _aggregateAsyncWithin.aggregateAsyncWithin_)(self, TR.collectAllN(chunkSize), SC.spaced(within));
}
/**
 * Partitions the stream with the specified chunkSize or until the specified
 * duration has passed, whichever is satisfied first.
 */


function groupedWithin(chunkSize, within) {
  return self => groupedWithin_(self, chunkSize, within);
}
//# sourceMappingURL=groupedWithin.js.map