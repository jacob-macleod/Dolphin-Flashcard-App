"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenCaseEffect = whenCaseEffect;
exports.whenCaseEffect_ = whenCaseEffect_;

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Chain = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./chain.js"));

var Empty = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./empty.js"));

var FromEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./fromEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given effectful value, otherwise returns an empty stream.
 */
function whenCaseEffect_(a, pf) {
  return Chain.chain_(FromEffect.fromEffect(a), _ => O.fold_(pf(_), () => Empty.empty, s => s));
}
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given effectful value, otherwise returns an empty stream.
 *
 * @ets_data_first whenCaseEffect_
 */


function whenCaseEffect(pf) {
  return a => whenCaseEffect_(a, pf);
}
//# sourceMappingURL=whenCaseEffect.js.map