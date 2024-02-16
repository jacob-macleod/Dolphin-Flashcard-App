// ets_tracing: off
import * as ST from "../../Structural/index.mjs";
export function sameAssertion_(self, that) {
  return ST.equals(self.assertion, that.assertion);
}
export function sameAssertion(that) {
  return self => sameAssertion_(self, that);
}
//# sourceMappingURL=sameAssertion.mjs.map