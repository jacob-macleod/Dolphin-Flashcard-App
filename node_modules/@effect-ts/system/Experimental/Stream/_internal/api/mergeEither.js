"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeEither = mergeEither;
exports.mergeEither_ = mergeEither_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Either/index.js"));

var MergeWith = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mergeWith.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 */
function mergeEither_(self, that) {
  return MergeWith.mergeWith(self, that, E.left, E.right);
}
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 *
 * @ets_data_first mergeEither_
 */


function mergeEither(that) {
  return self => mergeEither_(self, that);
}
//# sourceMappingURL=mergeEither.js.map