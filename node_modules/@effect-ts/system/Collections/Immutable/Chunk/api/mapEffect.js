"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffect = mapEffect;
exports.mapEffect_ = mapEffect_;

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/excl-forEach.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully maps the elements of this chunk.
 */
function mapEffect_(self, f) {
  return forEach.forEach_(self, f);
}
/**
 * Effectfully maps the elements of this chunk.
 *
 * @ets_data_first mapEffect_
 */


function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.js.map