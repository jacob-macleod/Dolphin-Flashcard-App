"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromHubWithShutdown = fromHubWithShutdown;
exports.fromHubWithShutdown_ = fromHubWithShutdown_;

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Hub/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var Ensuring = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ensuring.js"));

var FromHub = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromHub.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 */
function fromHubWithShutdown_(hub, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return Ensuring.ensuring_(FromHub.fromHub_(hub, maxChunkSize), H.shutdown(hub));
}
/**
 * Creates a stream from a subscription to a hub.
 *
 * The hub will be shut down once the stream is closed.
 *
 * @ets_data_first fromHubWithShutdown_
 */


function fromHubWithShutdown(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return hub => fromHubWithShutdown_(hub, maxChunkSize);
}
//# sourceMappingURL=fromHubWithShutdown.js.map