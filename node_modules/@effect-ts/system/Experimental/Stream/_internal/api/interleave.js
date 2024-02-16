"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interleave = interleave;
exports.interleave_ = interleave_;

var CK = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Chunk/index.js"));

var Forever = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./forever.js"));

var FromChunk = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromChunk.js"));

var InterleaveWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./interleaveWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 */
function interleave_(self, that) {
  return InterleaveWith.interleaveWith_(self, that, Forever.forever(FromChunk.fromChunk(CK.from([true, false]))));
}
/**
 * Interleaves this stream and the specified stream deterministically by
 * alternating pulling values from this stream and the specified stream.
 * When one stream is exhausted all remaining values in the other stream
 * will be pulled.
 *
 * @ets_data_first interleave_
 */


function interleave(that) {
  return self => interleave_(self, that);
}
//# sourceMappingURL=interleave.js.map