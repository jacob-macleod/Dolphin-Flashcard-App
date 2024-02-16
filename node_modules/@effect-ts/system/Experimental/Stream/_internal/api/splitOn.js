"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.splitOn = splitOn;
exports.splitOn_ = splitOn_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../../../Function/index.js");

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

var MapChunks = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapChunks.js"));

var SplitOnChunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./splitOnChunk.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Splits strings on a delimiter.
 */
function splitOn_(self, delimiter) {
  return Map.map_(SplitOnChunk.splitOnChunk_(MapChunks.mapChunks_(Map.map_(self, str => CK.from(str)), CK.flatten), CK.from(delimiter)), _ => [..._].join(""));
}
/**
 * Splits strings on a delimiter.
 *
 * @ets_data_first splitOn_
 */


function splitOn(delimiter) {
  return self => splitOn_(self, delimiter);
}
//# sourceMappingURL=splitOn.js.map