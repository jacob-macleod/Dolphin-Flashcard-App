"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapEffect = mapEffect;
exports.mapEffectPar = mapEffectPar;
exports.mapEffectParN = mapEffectParN;
exports.mapEffectParN_ = mapEffectParN_;
exports.mapEffectPar_ = mapEffectPar_;
exports.mapEffect_ = mapEffect_;
exports.mapSync = mapSync;
exports.mapSync_ = mapSync_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Effect"));

var S = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("@effect-ts/system/Sync"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./operations.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */
function mapEffect_(self, f) {
  return T.map_(T.forEach_(self, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffect_
 */


function mapEffect(f) {
  return self => mapEffect_(self, f);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */


function mapEffectPar_(self, f) {
  return T.map_(T.forEachPar_(self, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffectPar_
 */


function mapEffectPar(f) {
  return self => mapEffectPar_(self, f);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */


function mapEffectParN_(self, n, f) {
  return T.map_(T.forEachParN_(self, n, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapEffectParN_
 */


function mapEffectParN(n, f) {
  return self => mapEffectParN_(self, n, f);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 */


function mapSync_(self, f) {
  return S.map_(S.forEach_(self, f), A.from);
}
/**
 * Applies the function f to each element of the Array<A> and returns the results in a new B[]
 *
 * @ets_data_first mapSync_
 */


function mapSync(f) {
  return self => mapSync_(self, f);
}
//# sourceMappingURL=interop.js.map