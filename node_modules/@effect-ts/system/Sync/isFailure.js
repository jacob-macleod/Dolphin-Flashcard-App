"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFailure = isFailure;

var _core = /*#__PURE__*/require("./core.js");

/**
 * Returns whether this effect is a failure.
 */
function isFailure(self) {
  return (0, _core.fold_)(self, () => true, () => false);
}
//# sourceMappingURL=isFailure.js.map