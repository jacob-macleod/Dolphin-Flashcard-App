"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asFailure = asFailure;
exports.asFailureM = asFailureM;
exports.asSuccess = asSuccess;
exports.asSuccessM = asSuccessM;
exports.makeAssertionMData = makeAssertionMData;

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var makeAssertionValue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/makeAssertionValue.js"));

var BA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebra/index.js"));

var BAM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebraM/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function makeAssertionMData(assertion, value) {
  return {
    value,
    assertion
  };
}

function asFailure(amd) {
  return BA.failure(makeAssertionValue.makeAssertionValue(amd.assertion, amd.value, () => asFailure(amd)));
}

function asSuccess(amd) {
  return BA.failure(makeAssertionValue.makeAssertionValue(amd.assertion, amd.value, () => asSuccess(amd)));
}

function asFailureM(amd) {
  return new BAM.BoolAlgebraM(T.succeed(asFailure(amd)));
}

function asSuccessM(amd) {
  return new BAM.BoolAlgebraM(T.succeed(asSuccess(amd)));
}
//# sourceMappingURL=index.js.map