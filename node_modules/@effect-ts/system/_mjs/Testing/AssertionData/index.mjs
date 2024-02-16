import * as makeAssertionValue from "../AssertionValue/makeAssertionValue.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
export function makeAssertionData(assertion, value) {
  return {
    value,
    assertion
  };
}
export function asFailure(ad) {
  return BA.failure(makeAssertionValue.makeAssertionValue(ad.assertion, ad.value, () => asFailure(ad)));
}
export function asSuccess(ad) {
  return BA.failure(makeAssertionValue.makeAssertionValue(ad.assertion, ad.value, () => asSuccess(ad)));
}
//# sourceMappingURL=index.mjs.map