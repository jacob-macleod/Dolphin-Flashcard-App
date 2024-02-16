"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.accessM = accessM;

var _environment = /*#__PURE__*/require("./environment.js");

var _mapM = /*#__PURE__*/require("./mapM.js");

/**
 * Accesses the environment of the stream in the context of an effect.
 */
function accessM(f) {
  return (0, _mapM.mapM_)((0, _environment.environment)(), f);
}
//# sourceMappingURL=accessM.js.map