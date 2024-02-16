"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.andThen = andThen;
exports.andThen_ = andThen_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Propagates the given environment to self.
 *
 * @ets_data_first andThen_
 */
function andThen(fb, __trace) {
  return fa => andThen_(fa, fb, __trace);
}
/**
 * Propagates the given environment to self.
 */


function andThen_(fa, fb, __trace) {
  return (0, _core.chain_)(fa, a => (0, _core.provideAll_)(fb, a), __trace);
}
//# sourceMappingURL=andThen.js.map