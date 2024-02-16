"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onRight = onRight;

var _environment = /*#__PURE__*/require("./environment.js");

var _join = /*#__PURE__*/require("./join.js");

/**
 * Returns this effect if environment is on the right, otherwise returns
 * whatever is on the left unmodified. Note that the result is lifted
 * in either.
 */
function onRight(__trace) {
  return self => (0, _join.joinEither_)((0, _environment.environment)(), self, __trace);
}
//# sourceMappingURL=onRight.js.map