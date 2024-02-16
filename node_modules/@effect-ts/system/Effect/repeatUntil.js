"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatUntil = repeatUntil;
exports.repeatUntilM = repeatUntilM;
exports.repeatUntilM_ = repeatUntilM_;
exports.repeatUntil_ = repeatUntil_;

var _core = /*#__PURE__*/require("./core.js");

var _zips = /*#__PURE__*/require("./zips.js");

// ets_tracing: off

/**
 * Repeats this effect until its error satisfies the specified effectful predicate.
 *
 * @ets_data_first repeatUntilM_
 */
function repeatUntilM(f, __trace) {
  return self => repeatUntilM_(self, f);
}
/**
 * Repeats this effect until its error satisfies the specified effectful predicate.
 */


function repeatUntilM_(self, f, __trace) {
  return (0, _core.chain_)(self, a => (0, _core.chain_)(f(a), b => b ? (0, _core.succeed)(a) : (0, _zips.zipRight_)(_core.yieldNow, repeatUntilM_(self, f))), __trace);
}
/**
 * Repeats this effect until its error satisfies the specified predicate.
 *
 * @ets_data_first repeatUntil_
 */


function repeatUntil(f, __trace) {
  return self => repeatUntil_(self, f, __trace);
}
/**
 * Repeats this effect until its error satisfies the specified predicate.
 */


function repeatUntil_(self, f, __trace) {
  return repeatUntilM_(self, a => (0, _core.succeed)(f(a)), __trace);
}
//# sourceMappingURL=repeatUntil.js.map