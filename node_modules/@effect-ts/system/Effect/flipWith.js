"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flipWith = flipWith;
exports.flipWith_ = flipWith_;

var _flip = /*#__PURE__*/require("./flip.js");

/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */
function flipWith(f, __trace) {
  return self => flipWith_(self, f, __trace);
}
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 */


function flipWith_(self, f, __trace) {
  return (0, _flip.flip)(f((0, _flip.flip)(self)), __trace);
}
//# sourceMappingURL=flipWith.js.map