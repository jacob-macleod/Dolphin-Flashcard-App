// ets_tracing: off
import * as AM from "../AssertionM/api.mjs";
import * as BA from "../BoolAlgebra/index.mjs";
import { makeAssertionValue } from "./makeAssertionValue.mjs";
export function negate(self) {
  return makeAssertionValue(AM.not(self.assertion), self.value, () => BA.not(self.result()), self.expression, self.sourceLocation);
}
//# sourceMappingURL=negate.mjs.map