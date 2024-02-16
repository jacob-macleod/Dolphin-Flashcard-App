"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asService = asService;
exports.asService_ = asService_;

var _map = /*#__PURE__*/require("./map.js");

/**
 * Maps the success value of this effect to a service.
 *
 * @datFirst asService_
 */
function asService(has, __trace) {
  return fa => asService_(fa, has, __trace);
}
/**
 * Maps the success value of this effect to a service.
 */


function asService_(fa, tag, __trace) {
  return (0, _map.map_)(fa, tag.has, __trace);
}
//# sourceMappingURL=asService.js.map