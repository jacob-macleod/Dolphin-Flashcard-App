"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onLeft = onLeft;

var _environment = /*#__PURE__*/require("./environment.js");

var _join = /*#__PURE__*/require("./join.js");

/**
 * Returns this effect if environment is on the left, otherwise returns
 * whatever is on the right unmodified. Note that the result is lifted
 * in either.
 */
function onLeft(__trace) {
  return self => (0, _join.joinEither_)(self, (0, _environment.environment)(), __trace);
}
//# sourceMappingURL=onLeft.js.map