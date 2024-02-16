"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eventually = eventually;

var _core = /*#__PURE__*/require("./core.js");

var _orElse = /*#__PURE__*/require("./orElse.js");

var _zips = /*#__PURE__*/require("./zips.js");

// ets_tracing: off

/**
 * Returns an effect that ignores errors and runs repeatedly until it eventually succeeds.
 */
function eventually(fa, __trace) {
  return (0, _orElse.orElse_)(fa, () => (0, _zips.zipRight_)(_core.yieldNow, eventually(fa)), __trace);
}
//# sourceMappingURL=eventually.js.map