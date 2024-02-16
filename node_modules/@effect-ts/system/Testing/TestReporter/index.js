"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DefaultTestReporter = DefaultTestReporter;

var _index = /*#__PURE__*/require("../TestLogger/index.js");

function DefaultTestReporter(_) {
  return (d, s) => (0, _index.logLine)(`duration: ${d}\n${JSON.stringify(s)}`);
}
//# sourceMappingURL=index.js.map