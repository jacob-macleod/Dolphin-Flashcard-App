"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElseFail = orElseFail;
exports.orElseFail_ = orElseFail_;

var _fail = /*#__PURE__*/require("./fail.js");

var _orElse = /*#__PURE__*/require("./orElse.js");

/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 *
 * @ets_data_first orElseFail_
 */
function orElseFail(e, __trace) {
  return self => orElseFail_(self, e, __trace);
}
/**
 * Executes this effect and returns its value, if it succeeds, but
 * otherwise fails with the specified error.
 */


function orElseFail_(self, e, __trace) {
  return (0, _orElse.orElse_)(self, () => (0, _fail.fail)(e), __trace);
}
//# sourceMappingURL=orElseFail.js.map