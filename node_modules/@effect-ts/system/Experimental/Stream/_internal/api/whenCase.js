"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.whenCase = whenCase;
exports.whenCase_ = whenCase_;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var WhenCaseEffect = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./whenCaseEffect.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given value, otherwise returns an empty stream.
 */
function whenCase_(a, pf) {
  return WhenCaseEffect.whenCaseEffect_(T.succeed(a()), pf);
}
/**
 * Returns the resulting stream when the given `PartialFunction` is defined for the given value, otherwise returns an empty stream.
 *
 * @ets_data_first whenCase_
 */


function whenCase(pf) {
  return a => whenCase_(a, pf);
}
//# sourceMappingURL=whenCase.js.map