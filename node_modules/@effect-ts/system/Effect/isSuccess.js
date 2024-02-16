"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSuccess = isSuccess;

var _fold = /*#__PURE__*/require("./fold.js");

/**
 * Returns whether this effect is a success.
 */
function isSuccess(self, __trace) {
  return (0, _fold.fold_)(self, () => false, () => true, __trace);
}
//# sourceMappingURL=isSuccess.js.map