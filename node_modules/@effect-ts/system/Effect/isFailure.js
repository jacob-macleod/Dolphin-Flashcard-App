"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isFailure = isFailure;

var _fold = /*#__PURE__*/require("./fold.js");

/**
 * Returns whether this effect is a failure.
 */
function isFailure(self, __trace) {
  return (0, _fold.fold_)(self, () => true, () => false, __trace);
}
//# sourceMappingURL=isFailure.js.map