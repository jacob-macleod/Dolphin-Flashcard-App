"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.repeatWhile = repeatWhile;
exports.repeatWhileM = repeatWhileM;
exports.repeatWhileM_ = repeatWhileM_;
exports.repeatWhile_ = repeatWhile_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Repeats this effect while its error satisfies the specified effectful predicate.
 *
 * @ets_data_first repeatWhileM_
 */
function repeatWhileM(f, __trace) {
  return self => repeatWhileM_(self, f, __trace);
}
/**
 * Repeats this effect while its error satisfies the specified effectful predicate.
 */


function repeatWhileM_(self, f, __trace) {
  return (0, _core.chain_)(self, a => (0, _core.chain_)(f(a), b => b ? repeatWhileM_(self, f) : (0, _core.succeed)(a)), __trace);
}
/**
 * Repeats this effect while its error satisfies the specified predicate.
 *
 * @ets_data_first repeatWhile_
 */


function repeatWhile(f, __trace) {
  return self => repeatWhile_(self, f, __trace);
}
/**
 * Repeats this effect while its error satisfies the specified predicate.
 */


function repeatWhile_(self, f, __trace) {
  return repeatWhileM_(self, a => (0, _core.succeed)(f(a)), __trace);
}
//# sourceMappingURL=repeatWhile.js.map