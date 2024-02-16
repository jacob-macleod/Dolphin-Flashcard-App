"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeoutFail = timeoutFail;
exports.timeoutFail_ = timeoutFail_;

var _core = /*#__PURE__*/require("./core.js");

var _fail = /*#__PURE__*/require("./fail.js");

var _flatten = /*#__PURE__*/require("./flatten.js");

var _timeoutTo = /*#__PURE__*/require("./timeoutTo.js");

/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified error.
 *
 * @ets_data_first timeoutFail_
 */
function timeoutFail(d, e, __trace) {
  return self => timeoutFail_(self, d, e, __trace);
}
/**
 * The same as `timeout`, but instead of producing a `None` in the event
 * of timeout, it will produce the specified error.
 */


function timeoutFail_(self, d, e, __trace) {
  return (0, _flatten.flatten)((0, _timeoutTo.timeoutTo_)(self, d, (0, _core.suspend)(() => (0, _fail.fail)(e())), _core.succeed, __trace));
}
//# sourceMappingURL=timeoutFail.js.map