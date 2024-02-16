"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bimap = bimap;
exports.bimap_ = bimap_;

var _map = /*#__PURE__*/require("./map.js");

var _mapError = /*#__PURE__*/require("./mapError.js");

/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */
function bimap_(self, f, g) {
  return (0, _map.map_)((0, _mapError.mapError_)(self, f), g);
}
/**
 * Returns a stream whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */


function bimap(f, g) {
  return self => bimap_(self, f, g);
}
//# sourceMappingURL=bimap.js.map