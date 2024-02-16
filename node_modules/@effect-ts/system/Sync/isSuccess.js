"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSuccess = isSuccess;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns whether this effect is a success.
 */
function isSuccess(self) {
  return (0, _core.fold_)(self, () => false, () => true);
}
//# sourceMappingURL=isSuccess.js.map