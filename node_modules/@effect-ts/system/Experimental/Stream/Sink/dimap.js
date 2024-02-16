"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dimap = dimap;
exports.dimap_ = dimap_;

var Contramap = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./contramap.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./map.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Transforms both inputs and result of this sink using the provided functions.
 */
function dimap_(self, f, g) {
  return Map.map_(Contramap.contramap_(self, f), g);
}
/**
 * Transforms both inputs and result of this sink using the provided functions.
 *
 * @ets_data_first dimap_
 */


function dimap(f, g) {
  return self => dimap_(self, f, g);
}
//# sourceMappingURL=dimap.js.map