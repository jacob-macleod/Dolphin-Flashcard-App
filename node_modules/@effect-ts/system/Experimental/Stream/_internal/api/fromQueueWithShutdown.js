"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromQueueWithShutdown = fromQueueWithShutdown;
exports.fromQueueWithShutdown_ = fromQueueWithShutdown_;

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Ensuring = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ensuring.js"));

var FromQueue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromQueue.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream from a queue of values. The queue will be shutdown once the stream is closed.
 *
 * @param maxChunkSize Maximum number of queued elements to put in one chunk in the stream
 */
function fromQueueWithShutdown_(queue, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return Ensuring.ensuring_(FromQueue.fromQueue_(queue, maxChunkSize), Q.shutdown(queue));
}
/**
 * Creates a stream from a queue of values. The queue will be shutdown once the stream is closed.
 *
 * @param maxChunkSize Maximum number of queued elements to put in one chunk in the stream
 *
 * @ets_data_first fromQueueWithShutdown_
 */


function fromQueueWithShutdown(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return queue => fromQueueWithShutdown_(queue, maxChunkSize);
}
//# sourceMappingURL=fromQueueWithShutdown.js.map