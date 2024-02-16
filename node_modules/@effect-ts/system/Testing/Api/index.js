"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.suite = suite;
exports.test = test;
exports.testM = testM;

var List = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/List/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var _index3 = /*#__PURE__*/require("../../Fiber/index.js");

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var makeAssertionValue = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/makeAssertionValue.js"));

var sameAssertion_ = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../AssertionValue/sameAssertion.js"));

var BA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../BoolAlgebra/index.js"));

var _index8 = /*#__PURE__*/require("../FailureDetails/index.js");

var Spec = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Spec/index.js"));

var TA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestAnnotation/index.js"));

var _index11 = /*#__PURE__*/require("../TestAnnotationMap/index.js");

var TF = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestFailure/index.js"));

var TS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TestSuccess/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
function test(label, __trace) {
  return assertion => testM(label, __trace)(() => T.succeedWith(assertion));
}

function testM(label, __trace) {
  return assertion => Spec.annotate(TA.location, __trace ? List.of(new _index3.SourceLocation(__trace)) : List.empty())(Spec.test(label, ZTest(assertion), _index11.TestAnnotationMap.empty));
}

function suite(label) {
  return (...tests) => Spec.suite(label, M.succeed(tests), O.none);
}

function ZTest(assertion) {
  return T.foldCauseM_(T.suspend(assertion), c => T.fail(TF.halt(c)), r => O.fold_(BA.failures(r), () => T.succeed(new TS.Succeeded(BA.unit)), failures => T.fail(TF.assertion(failures))));
}

function assert(value, expression = O.none, sourceLocation = O.none) {
  return assertion => traverseResult(() => value, assertion.run(() => value), assertion, expression, sourceLocation);
}

function traverseResult(value, assertResult, assertion, expression, sourceLocation) {
  return BA.chain(fragment => {
    function loop(whole, failureDetails) {
      if (sameAssertion_.sameAssertion_(whole, failureDetails.assertion[0])) {
        return BA.success(failureDetails);
      }

      const fragment = whole.result();
      const result = BA.isSuccess(fragment) ? fragment : fragment["!"];
      return BA.chain_(result, fragment => loop(fragment, new _index8.FailureDetails([whole, ...failureDetails.assertion])));
    }

    return loop(fragment, new _index8.FailureDetails([makeAssertionValue.makeAssertionValue(assertion, value, () => assertResult, expression, sourceLocation)]));
  })(assertResult);
}
//# sourceMappingURL=index.js.map