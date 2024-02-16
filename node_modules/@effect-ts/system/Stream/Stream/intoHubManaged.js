"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intoHubManaged = intoHubManaged;
exports.intoHubManaged_ = intoHubManaged_;

var H = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Hub/index.js"));

var _intoManaged = /*#__PURE__*/require("./intoManaged.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Like `Stream#intoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */
function intoHubManaged_(self, hub) {
  return (0, _intoManaged.intoManaged_)(self, H.toQueue(hub));
}
/**
 * Like `Stream#intoHub`, but provides the result as a `Managed` to allow for scope
 * composition.
 */


function intoHubManaged(hub) {
  return self => intoHubManaged_(self, hub);
}
//# sourceMappingURL=intoHubManaged.js.map