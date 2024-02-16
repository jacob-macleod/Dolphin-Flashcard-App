"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.access = access;

var _environment = /*#__PURE__*/require("./environment.js");

var _map = /*#__PURE__*/require("./map.js");

/**
 * Accesses the environment of the stream.
 */
function access(f) {
  return (0, _map.map_)((0, _environment.environment)(), f);
}
//# sourceMappingURL=access.js.map