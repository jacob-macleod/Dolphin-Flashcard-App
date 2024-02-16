import * as O from "../../Option/index.mjs";
export function makeAssertionValue(assertion, value, result, expression = O.none, sourceLocation = O.none) {
  return {
    value,
    expression,
    sourceLocation,
    assertion,
    result
  };
}
//# sourceMappingURL=makeAssertionValue.mjs.map