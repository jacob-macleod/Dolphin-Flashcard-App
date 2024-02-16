"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromHubManaged = fromHubManaged;
exports.fromHubManaged_ = fromHubManaged_;

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Hub/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../core.js"));

var FromQueueWithShutdown = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromQueueWithShutdown.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 */
function fromHubManaged_(hub, maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return M.map_(H.subscribe(hub), FromQueueWithShutdown.fromQueueWithShutdown(maxChunkSize));
}
/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * @ets_data_first fromHubManaged_
 */


function fromHubManaged(maxChunkSize = C.DEFAULT_CHUNK_SIZE) {
  return hub => fromHubManaged_(hub, maxChunkSize);
}
//# sourceMappingURL=fromHubManaged.js.map