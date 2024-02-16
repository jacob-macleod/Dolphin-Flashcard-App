"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapConcat = mapConcat;
exports.mapConcat_ = mapConcat_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _mapChunks = /*#__PURE__*/require("./mapChunks.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */
function mapConcat_(self, f) {
  return (0, _mapChunks.mapChunks_)(self, o => A.chain_(o, o => A.from(f(o))));
}
/**
 * Maps each element to an iterable, and flattens the iterables into the
 * output of this stream.
 */


function mapConcat(f) {
  return self => mapConcat_(self, f);
}
//# sourceMappingURL=mapConcat.js.map