"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withContext = withContext;
exports.withContext_ = withContext_;

var _makeAssertionValue = /*#__PURE__*/require("./makeAssertionValue.js");

function withContext_(self, expr, sourceLocation) {
  return (0, _makeAssertionValue.makeAssertionValue)(self.assertion, self.value, self.result, expr, sourceLocation);
}

function withContext(expr, sourceLocation) {
  return self => withContext_(self, expr, sourceLocation);
}
//# sourceMappingURL=withContext.js.map