"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ap = ap;
exports.ap_ = ap_;

var _core = /*#__PURE__*/require("./core.js");

var _map = /*#__PURE__*/require("./map.js");

// ets_tracing: off

/**
 * Applicative's ap
 */
function ap(fa, __trace) {
  return fab => ap_(fab, fa, __trace);
}
/**
 * Applicative's ap
 */


function ap_(fab, fa, __trace) {
  return (0, _core.chain_)(fab, ab => (0, _map.map_)(fa, ab), __trace);
}
//# sourceMappingURL=ap.js.map