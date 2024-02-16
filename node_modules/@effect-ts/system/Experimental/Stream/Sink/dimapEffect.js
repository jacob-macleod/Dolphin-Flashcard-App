"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dimapEffect = dimapEffect;
exports.dimapEffect_ = dimapEffect_;

var ContramapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./contramapEffect.js"));

var MapEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./mapEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 */
function dimapEffect_(self, f, g) {
  return MapEffect.mapEffect_(ContramapEffect.contramapEffect_(self, f), g);
}
/**
 * Effectfully transforms both inputs and result of this sink using the provided functions.
 *
 * @ets_data_first dimapEffect_
 */


function dimapEffect(f, g) {
  return self => dimapEffect_(self, f, g);
}
//# sourceMappingURL=dimapEffect.js.map