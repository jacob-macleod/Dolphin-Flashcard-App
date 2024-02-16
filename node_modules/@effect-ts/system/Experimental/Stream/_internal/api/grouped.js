"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.grouped = grouped;
exports.grouped_ = grouped_;

var SK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Sink/index.js"));

var Transduce = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./transduce.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 */
function grouped_(self, chunkSize) {
  return Transduce.transduce_(self, SK.collectAllN(chunkSize));
}
/**
 * Partitions the stream with specified chunkSize
 * @param chunkSize size of the chunk
 *
 * @ets_data_first grouped_
 */


function grouped(chunkSize) {
  return self => grouped_(self, chunkSize);
}
//# sourceMappingURL=grouped.js.map