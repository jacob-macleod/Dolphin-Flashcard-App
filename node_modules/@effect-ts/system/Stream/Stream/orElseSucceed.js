"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orElseSucceed = orElseSucceed;
exports.orElseSucceed_ = orElseSucceed_;

var _orElse = /*#__PURE__*/require("./orElse.js");

var _succeed = /*#__PURE__*/require("./succeed.js");

/**
 * Succeeds with the specified value if this one fails with a typed error.
 */
function orElseSucceed_(self, o1) {
  return (0, _orElse.orElse_)(self, (0, _succeed.succeed)(o1));
}
/**
 * Succeeds with the specified value if this one fails with a typed error.
 */


function orElseSucceed(o1) {
  return self => orElseSucceed_(self, o1);
}
//# sourceMappingURL=orElseSucceed.js.map