"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwrap = unwrap;

var _flatten = /*#__PURE__*/require("./flatten.js");

var _fromEffect = /*#__PURE__*/require("./fromEffect.js");

/**
 * Creates a stream produced from an effect
 */
function unwrap(fa) {
  return (0, _flatten.flatten)((0, _fromEffect.fromEffect)(fa));
}
//# sourceMappingURL=unwrap.js.map