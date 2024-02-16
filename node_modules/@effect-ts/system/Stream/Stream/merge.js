"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;
exports.mergeEither = mergeEither;
exports.mergeEither_ = mergeEither_;
exports.mergeTerminateEither = mergeTerminateEither;
exports.mergeTerminateEither_ = mergeTerminateEither_;
exports.mergeTerminateLeft = mergeTerminateLeft;
exports.mergeTerminateLeft_ = mergeTerminateLeft_;
exports.mergeTerminateRight = mergeTerminateRight;
exports.mergeTerminateRight_ = mergeTerminateRight_;
exports.merge_ = merge_;

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _mergeWith = /*#__PURE__*/require("./mergeWith.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 */
function merge_(self, that, strategy = "Both") {
  return (0, _mergeWith.mergeWith_)(self, that, a => a, b => b, strategy);
}
/**
 * Merges this stream and the specified stream together.
 *
 * New produced stream will terminate when both specified stream terminate if no termination
 * strategy is specified.
 *
 * @ets_data_first merge_
 */


function merge(that, strategy = "Both") {
  return self => merge_(self, that, strategy);
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */


function mergeTerminateEither_(self, that) {
  return merge_(self, that, "Either");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when either stream terminates.
 */


function mergeTerminateEither(that) {
  return self => merge_(self, that, "Either");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */


function mergeTerminateLeft_(self, that) {
  return merge_(self, that, "Left");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when this stream terminates.
 */


function mergeTerminateLeft(that) {
  return self => merge_(self, that, "Left");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */


function mergeTerminateRight_(self, that) {
  return merge_(self, that, "Right");
}
/**
 * Merges this stream and the specified stream together. New produced stream will
 * terminate when the specified stream terminates.
 */


function mergeTerminateRight(that) {
  return self => merge_(self, that, "Right");
}
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 */


function mergeEither_(self, that, strategy = "Both") {
  return (0, _mergeWith.mergeWith_)(self, that, l => E.left(l), E.right, strategy);
}
/**
 * Merges this stream and the specified stream together to produce a stream of
 * eithers.
 *
 * @ets_data_first mergeEither_
 */


function mergeEither(that, strategy = "Both") {
  return self => mergeEither_(self, that, strategy);
}
//# sourceMappingURL=merge.js.map