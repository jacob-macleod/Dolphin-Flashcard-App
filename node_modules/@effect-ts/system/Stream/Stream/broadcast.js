"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.broadcast = broadcast;
exports.broadcast_ = broadcast_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var _broadcastedQueues = /*#__PURE__*/require("./broadcastedQueues.js");

var _flattenTake = /*#__PURE__*/require("./flattenTake.js");

var _fromQueueWithShutdown = /*#__PURE__*/require("./fromQueueWithShutdown.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Fan out the stream, producing a list of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */
function broadcast(n, maximumLag) {
  return self => broadcast_(self, n, maximumLag);
}
/**
 * Fan out the stream, producing a list of streams that have the same elements as this stream.
 * The driver stream will only ever advance of the `maximumLag` chunks before the
 * slowest downstream stream.
 */


function broadcast_(self, n, maximumLag) {
  return M.map_((0, _broadcastedQueues.broadcastedQueues_)(self, n, maximumLag), A.map(q => (0, _flattenTake.flattenTake)((0, _fromQueueWithShutdown.fromQueueWithShutdown)(q))));
}
//# sourceMappingURL=broadcast.js.map