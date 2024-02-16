"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatN = repeatN;
exports.repeatN_ = repeatN_;

var _core = /*#__PURE__*/require("./core.js");

var _zips = /*#__PURE__*/require("./zips.js");

// ets_tracing: off

/**
 * Repeats this effect the specified number of times.
 *
 * @ets_data_first repeatN_
 */
function repeatN(n, __trace) {
  return self => repeatN_(self, n, __trace);
}
/**
 * Repeats this effect the specified number of times.
 */


function repeatN_(self, n, __trace) {
  return (0, _core.chain_)(self, a => n <= 0 ? (0, _core.succeed)(a) : (0, _zips.zipRight_)(_core.yieldNow, repeatN_(self, n - 1)), __trace);
}
//# sourceMappingURL=repeatN.js.map