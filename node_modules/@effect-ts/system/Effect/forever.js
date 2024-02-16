"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forever = forever;

var _core = /*#__PURE__*/require("./core.js");

var _zips = /*#__PURE__*/require("./zips.js");

// ets_tracing: off

/**
 * Repeats this effect forever (until the first error).
 */
function forever(effect, __trace) {
  return (0, _core.chain_)(effect, () => (0, _zips.zipRight_)(_core.yieldNow, forever(effect)), __trace);
}
//# sourceMappingURL=forever.js.map