import { makeAssertionValue } from "./makeAssertionValue.mjs";
export function withContext_(self, expr, sourceLocation) {
  return makeAssertionValue(self.assertion, self.value, self.result, expr, sourceLocation);
}
export function withContext(expr, sourceLocation) {
  return self => withContext_(self, expr, sourceLocation);
}
//# sourceMappingURL=withContext.mjs.map