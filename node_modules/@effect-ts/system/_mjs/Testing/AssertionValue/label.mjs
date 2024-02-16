// ets_tracing: off
import * as AM from "../AssertionM/api.mjs";
import { makeAssertionValue } from "./makeAssertionValue.mjs";
export function label_(self, l) {
  return makeAssertionValue(AM.label_(self.assertion, l), self.value, self.result, self.expression, self.sourceLocation);
}
export function label(l) {
  return self => label_(self, l);
}
//# sourceMappingURL=label.mjs.map