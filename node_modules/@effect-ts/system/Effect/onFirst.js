"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onFirst = onFirst;

var _environment = /*#__PURE__*/require("./environment.js");

var _zip = /*#__PURE__*/require("./zip.js");

/**
 * Propagates the success value to the first element of a tuple, but
 * passes the effect input `R` along unmodified as the second element
 * of the tuple.
 */
function onFirst(self, __trace) {
  return (0, _zip.zip_)(self, (0, _environment.environment)(), __trace);
}
//# sourceMappingURL=onFirst.js.map