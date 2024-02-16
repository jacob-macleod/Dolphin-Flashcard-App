"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unwrapManaged = unwrapManaged;

var _flatten = /*#__PURE__*/require("./flatten.js");

var _managed = /*#__PURE__*/require("./managed.js");

/**
 * Creates a stream produced from a [[ZManaged]]
 */
function unwrapManaged(fa) {
  return (0, _flatten.flatten)((0, _managed.managed)(fa));
}
//# sourceMappingURL=unwrapManaged.js.map