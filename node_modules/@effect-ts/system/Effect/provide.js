"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.provide = provide;
exports.provide_ = provide_;

var _provideSome = /*#__PURE__*/require("./provideSome.js");

/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 *
 * @ets_data_first provide_
 */
function provide(r, __trace) {
  return next => provide_(next, r, __trace);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */


function provide_(next, r, __trace) {
  return (0, _provideSome.provideSome_)(next, r0 => ({ ...r0,
    ...r
  }), __trace);
}
//# sourceMappingURL=provide.js.map