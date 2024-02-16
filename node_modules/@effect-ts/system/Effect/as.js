"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.as = as;
exports.as_ = as_;

var _map = /*#__PURE__*/require("./map.js");

/**
 * Maps the success value of this effect to the specified constant value.
 */
function as_(self, b, __trace) {
  return (0, _map.map_)(self, () => b, __trace);
}
/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */


function as(b, __trace) {
  return self => as_(self, b, __trace);
}
//# sourceMappingURL=as.js.map