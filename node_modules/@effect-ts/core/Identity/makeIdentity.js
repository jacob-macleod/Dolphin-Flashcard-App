"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  makeIdentity: true
};
exports.makeIdentity = makeIdentity;

var _index = /*#__PURE__*/require("../Prelude/index.js");

var _definition = /*#__PURE__*/require("./definition.js");

Object.keys(_definition).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _definition[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _definition[key];
    }
  });
});

// ets_tracing: off

/**
 * Creates a new `Identity`
 */
function makeIdentity(identity, op) {
  return {
    combine: op,
    identity
  };
}
//# sourceMappingURL=makeIdentity.js.map