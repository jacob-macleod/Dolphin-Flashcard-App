"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromHubWithShutdown = fromHubWithShutdown;

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Hub/index.js"));

var _ensuringFirst = /*#__PURE__*/require("./ensuringFirst.js");

var _fromHub = /*#__PURE__*/require("./fromHub.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Creates a stream from a subscription to a hub.
 */
function fromHubWithShutdown(hub) {
  return (0, _ensuringFirst.ensuringFirst_)((0, _fromHub.fromHub)(hub), H.shutdown(hub));
}
//# sourceMappingURL=fromHubWithShutdown.js.map