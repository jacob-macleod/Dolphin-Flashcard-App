"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sandbox = sandbox;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

/**
 * Exposes the full cause of failure of this effect.
 */
function sandbox(fa, __trace) {
  return (0, _core.foldCauseM_)(fa, _fail.fail, _core.succeed, __trace);
}
//# sourceMappingURL=sandbox.js.map