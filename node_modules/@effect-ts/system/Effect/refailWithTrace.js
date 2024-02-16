"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.refailWithTrace = refailWithTrace;

var _index = /*#__PURE__*/require("../Cause/index.js");

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Attach a wrapping trace pointing to this location in case of error.
 *
 * Useful when joining fibers to make the resulting trace mention
 * the `join` point, otherwise only the traces of joined fibers are
 * included.
 */
function refailWithTrace(self, __trace) {
  return (0, _core.foldCauseM_)(self, cause => (0, _core.haltWith)(trace => (0, _index.traced)(cause, trace())), _core.succeed, __trace);
}
//# sourceMappingURL=refailWithTrace.js.map