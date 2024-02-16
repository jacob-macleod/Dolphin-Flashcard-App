"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flattenErrorOption = flattenErrorOption;
exports.flattenErrorOption_ = flattenErrorOption_;

var _index = /*#__PURE__*/require("../Function/index.js");

var _index2 = /*#__PURE__*/require("../Option/index.js");

var _mapError = /*#__PURE__*/require("./mapError.js");

// ets_tracing: off

/**
 * Unwraps the optional error, defaulting to the provided value.
 *
 * @ets_data_first flattenErrorOption_
 */
function flattenErrorOption(def, __trace) {
  return self => flattenErrorOption_(self, def, __trace);
}
/**
 * Unwraps the optional error, defaulting to the provided value.
 */


function flattenErrorOption_(self, def, __trace) {
  return (0, _mapError.mapError_)(self, (0, _index2.fold)(def, _index.identity), __trace);
}
//# sourceMappingURL=flattenErrorOption.js.map