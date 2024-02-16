"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromChunkQueueWithShutdown = fromChunkQueueWithShutdown;

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var Ensuring = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ensuring.js"));

var FromChunkQueue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromChunkQueue.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from a queue of values. The queue will be shutdown once the stream is closed.
 */
function fromChunkQueueWithShutdown(queue) {
  return Ensuring.ensuring_(FromChunkQueue.fromChunkQueue(queue), Q.shutdown(queue));
}
//# sourceMappingURL=fromChunkQueueWithShutdown.js.map