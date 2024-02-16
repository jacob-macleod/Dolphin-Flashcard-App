"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapConcatM = mapConcatM;
exports.mapConcatM_ = mapConcatM_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var _index2 = /*#__PURE__*/require("../../Function/index.js");

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var _mapConcatChunkM = /*#__PURE__*/require("./mapConcatChunkM.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */
function mapConcatM_(self, f) {
  return (0, _mapConcatChunkM.mapConcatChunkM_)(self, o => T.map_(f(o), A.from));
}
/**
 * Effectfully maps each element to an iterable, and flattens the iterables into
 * the output of this stream.
 */


function mapConcatM(f) {
  return self => mapConcatM_(self, f);
}
//# sourceMappingURL=mapConcatM.js.map