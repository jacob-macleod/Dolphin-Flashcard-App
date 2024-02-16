"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asFailure = asFailure;
exports.asSuccess = asSuccess;
exports.makeAssertionData = makeAssertionData;

var makeAssertionValue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/makeAssertionValue.js"));

var BA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebra/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function makeAssertionData(assertion, value) {
  return {
    value,
    assertion
  };
}

function asFailure(ad) {
  return BA.failure(makeAssertionValue.makeAssertionValue(ad.assertion, ad.value, () => asFailure(ad)));
}

function asSuccess(ad) {
  return BA.failure(makeAssertionValue.makeAssertionValue(ad.assertion, ad.value, () => asSuccess(ad)));
}
//# sourceMappingURL=index.js.map