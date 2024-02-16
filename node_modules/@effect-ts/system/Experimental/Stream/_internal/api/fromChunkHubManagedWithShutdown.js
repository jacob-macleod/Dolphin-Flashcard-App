"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromChunkHubManagedWithShutdown = fromChunkHubManagedWithShutdown;

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Hub/index.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var Ensuring = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./ensuring.js"));

var FromChunkHubManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromChunkHubManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Creates a stream from a subscription to a hub in the context of a managed
 * effect. The managed effect describes subscribing to receive messages from
 * the hub while the stream describes taking messages from the hub.
 *
 * The hub will be shut down once the stream is closed.
 */
function fromChunkHubManagedWithShutdown(hub) {
  return M.map_(FromChunkHubManaged.fromChunkHubManaged(hub), Ensuring.ensuring(H.shutdown(hub)));
}
//# sourceMappingURL=fromChunkHubManagedWithShutdown.js.map