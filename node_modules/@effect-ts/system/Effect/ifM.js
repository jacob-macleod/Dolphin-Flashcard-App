"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.if = _if;
exports.ifM = ifM;
exports.ifM_ = ifM_;
exports.if_ = if_;

var _core = /*#__PURE__*/require("./core.js");

// ets_tracing: off

/**
 * Run conditionally onTrue or onFalse
 *
 * @ets_data_first ifM_
 */
function ifM(onTrue, onFalse, __trace) {
  return b => ifM_(b, onTrue, onFalse, __trace);
}
/**
 * Run conditionally onTrue or onFalse
 */


function ifM_(b, onTrue, onFalse, __trace) {
  return (0, _core.chain_)(b, x => x ? (0, _core.suspend)(onTrue, __trace) : (0, _core.suspend)(onFalse, __trace));
}
/**
 * Run conditionally onTrue or onFalse
 *
 * @ets_data_first if_
 */


function _if(onTrue, onFalse, __trace) {
  return b => if_(b, onTrue, onFalse, __trace);
}
/**
 * Run conditionally onTrue or onFalse
 */


function if_(b, onTrue, onFalse, __trace) {
  return ifM_((0, _core.succeed)(b), onTrue, onFalse, __trace);
}
//# sourceMappingURL=ifM.js.map