"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeBounded = makeBounded;

/**
 * Creates Bounded[A] from equals & compare functions
 */
function makeBounded(compare, top, bottom) {
  return {
    compare,
    bottom,
    top
  };
}
//# sourceMappingURL=operations.js.map