"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.as = as;
exports.as_ = as_;

var _map = /*#__PURE__*/require("./map.js");

/**
 * Maps the success values of this stream to the specified constant value.
 */
function as_(self, o2) {
  return (0, _map.map_)(self, () => o2);
}
/**
 * Maps the success values of this stream to the specified constant value.
 */


function as(o2) {
  return self => (0, _map.map_)(self, () => o2);
}
//# sourceMappingURL=as.js.map