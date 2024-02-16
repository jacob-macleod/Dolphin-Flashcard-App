// ets_tracing: off
import * as List from "../../Collections/Immutable/List/index.mjs";
import * as T from "../../Effect/index.mjs";
import { SourceLocation } from "../../Fiber/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as M from "../../Managed/index.mjs";
import * as O from "../../Option/index.mjs";
import * as makeAssertionValue from "../AssertionValue/makeAssertionValue.mjs";
import * as sameAssertion_ from "../AssertionValue/sameAssertion.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
import { FailureDetails } from "../FailureDetails/index.mjs";
import * as Spec from "../Spec/index.mjs";
import * as TA from "../TestAnnotation/index.mjs";
import { TestAnnotationMap } from "../TestAnnotationMap/index.mjs";
import * as TF from "../TestFailure/index.mjs";
import * as TS from "../TestSuccess/index.mjs";
export function test(label, __trace) {
  return assertion => testM(label, __trace)(() => T.succeedWith(assertion));
}
export function testM(label, __trace) {
  return assertion => Spec.annotate(TA.location, __trace ? List.of(new SourceLocation(__trace)) : List.empty())(Spec.test(label, ZTest(assertion), TestAnnotationMap.empty));
}
export function suite(label) {
  return (...tests) => Spec.suite(label, M.succeed(tests), O.none);
}

function ZTest(assertion) {
  return T.foldCauseM_(T.suspend(assertion), c => T.fail(TF.halt(c)), r => O.fold_(BA.failures(r), () => T.succeed(new TS.Succeeded(BA.unit)), failures => T.fail(TF.assertion(failures))));
}

export function assert(value, expression = O.none, sourceLocation = O.none) {
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
      return BA.chain_(result, fragment => loop(fragment, new FailureDetails([whole, ...failureDetails.assertion])));
    }

    return loop(fragment, new FailureDetails([makeAssertionValue.makeAssertionValue(assertion, value, () => assertResult, expression, sourceLocation)]));
  })(assertResult);
}
//# sourceMappingURL=index.mjs.map