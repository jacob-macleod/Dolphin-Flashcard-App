"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutFailCause = timeoutFailCause;
exports.timeoutFailCause_ = timeoutFailCause_;

var _core = /*#__PURE__*/require("./core.js");

var _flatten = /*#__PURE__*/require("./flatten.js");

var _timeoutTo = /*#__PURE__*/require("./timeoutTo.js");

/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified failure.
 */
function timeoutFailCause_(self, cause, d, __trace) {
  return (0, _flatten.flatten)((0, _timeoutTo.timeoutTo_)(self, d, (0, _core.suspend)(() => (0, _core.halt)(cause())), _ => (0, _core.succeed)(_), __trace));
}
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified failure.
 *
 * @ets_data_first timeoutFailCause_
 */


function timeoutFailCause(cause, d, __trace) {
  return self => timeoutFailCause_(self, cause, d, __trace);
}
//# sourceMappingURL=timeoutFailCause.js.map