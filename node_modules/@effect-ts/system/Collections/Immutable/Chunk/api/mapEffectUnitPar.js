"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffectUnitParN = mapEffectUnitParN;
exports.mapEffectUnitParN_ = mapEffectUnitParN_;

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/excl-forEach.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 */
function mapEffectUnitParN_(self, n, f) {
  return forEach.forEachUnitParN_(self, n, f);
}
/**
 * Effectfully maps the elements of this chunk in parallel purely for the effects.
 *
 * @ets_data_first mapEffectUnitParN_
 */


function mapEffectUnitParN(n, f) {
  return self => mapEffectUnitParN_(self, n, f);
}
//# sourceMappingURL=mapEffectUnitPar.js.map