"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElseFail = orElseFail;
exports.orElseFail_ = orElseFail_;

var _fail = /*#__PURE__*/require("./fail.js");

var _orElse = /*#__PURE__*/require("./orElse.js");

/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */
function orElseFail_(self, e) {
  return (0, _orElse.orElse_)(self, (0, _fail.fail)(e));
}
/**
 * Fails with given error in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */


function orElseFail(e) {
  return self => orElseFail_(self, e);
}
//# sourceMappingURL=orElseFail.js.map