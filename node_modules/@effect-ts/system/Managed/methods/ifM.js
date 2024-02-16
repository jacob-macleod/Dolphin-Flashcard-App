"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.if = _if;
exports.ifM = ifM;
exports.ifM_ = ifM_;
exports.if_ = if_;

var _core = /*#__PURE__*/require("../core.js");

var _succeed = /*#__PURE__*/require("../succeed.js");

// ets_tracing: off

/**
 * Conditional logic
 *
 * @ets_data_first ifM_
 */
function ifM(onTrue, onFalse, __trace) {
  return b => ifM_(b, onTrue, onFalse, __trace);
}
/**
 * Conditional logic
 */


function ifM_(b, onTrue, onFalse, __trace) {
  return (0, _core.chain_)(b, x => x ? onTrue() : onFalse(), __trace);
}
/**
 * Conditional logic
 *
 * @ets_data_first if_
 */


function _if(onTrue, onFalse) {
  return b => if_(b, onTrue, onFalse);
}
/**
 * Conditional logic
 */


function if_(b, onTrue, onFalse, __trace) {
  return ifM_((0, _succeed.succeed)(b), onTrue, onFalse, __trace);
}
//# sourceMappingURL=ifM.js.map