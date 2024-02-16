"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersperseAffixes = intersperseAffixes;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var _concat = /*#__PURE__*/require("./concat.js");

var _fromChunk = /*#__PURE__*/require("./fromChunk.js");

var _intersperse = /*#__PURE__*/require("./intersperse.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Intersperse and also add a prefix and a suffix
 */
function intersperseAffixes(self, start, middle, end) {
  return (0, _concat.concat)((0, _fromChunk.fromChunk)(A.single(end)))((0, _concat.concat)((0, _intersperse.intersperse_)(self, middle))((0, _fromChunk.fromChunk)(A.single(start))));
}
//# sourceMappingURL=intersperseAffixes.js.map