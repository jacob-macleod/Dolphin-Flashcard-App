"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parallelErrors = parallelErrors;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

/**
 * Exposes all parallel errors in a single call
 */
function parallelErrors(self, __trace) {
  return (0, _core.foldCauseM_)(self, cause => {
    const f = (0, _index.failures)(cause);

    if (f.length === 0) {
      return (0, _core.halt)(cause);
    } else {
      return (0, _fail.fail)(f);
    }
  }, _core.succeed, __trace);
}
//# sourceMappingURL=parallelErrors.js.map