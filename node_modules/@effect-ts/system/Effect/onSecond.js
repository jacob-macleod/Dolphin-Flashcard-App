"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onSecond = onSecond;

var _environment = /*#__PURE__*/require("./environment.js");

var _zip = /*#__PURE__*/require("./zip.js");

/**
 * Propagates the success value to the second element of a tuple, but
 * passes the effect input `R` along unmodified as the first element
 * of the tuple.
 */
function onSecond(self, __trace) {
  return (0, _zip.zip_)((0, _environment.environment)(), self, __trace);
}
//# sourceMappingURL=onSecond.js.map