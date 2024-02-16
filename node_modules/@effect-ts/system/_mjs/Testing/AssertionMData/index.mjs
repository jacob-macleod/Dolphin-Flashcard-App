// ets_tracing: off
import * as T from "../../Effect/index.mjs";
import * as makeAssertionValue from "../AssertionValue/makeAssertionValue.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
import * as BAM from "../BoolAlgebraM/index.mjs";
export function makeAssertionMData(assertion, value) {
  return {
    value,
    assertion
  };
}
export function asFailure(amd) {
  return BA.failure(makeAssertionValue.makeAssertionValue(amd.assertion, amd.value, () => asFailure(amd)));
}
export function asSuccess(amd) {
  return BA.failure(makeAssertionValue.makeAssertionValue(amd.assertion, amd.value, () => asSuccess(amd)));
}
export function asFailureM(amd) {
  return new BAM.BoolAlgebraM(T.succeed(asFailure(amd)));
}
export function asSuccessM(amd) {
  return new BAM.BoolAlgebraM(T.succeed(asSuccess(amd)));
}
//# sourceMappingURL=index.mjs.map