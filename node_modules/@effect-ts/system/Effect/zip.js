"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.zip = zip;
exports.zip_ = zip_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Sequentially zips this effect with the specified effect
 *
 * @ets_data_first zip_
 */
function zip(b, __trace) {
  return a => zip_(a, b, __trace);
}
/**
 * Sequentially zips this effect with the specified effect
 */


function zip_(a, b, __trace) {
  return (0, _core.chain_)(a, ra => (0, _map.map_)(b, rb => Tp.tuple(ra, rb)), __trace);
}
//# sourceMappingURL=zip.js.map