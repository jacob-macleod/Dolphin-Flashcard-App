"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.via = via;

/**
 * Threads the stream through the transformation function `f`.
 */
function via(self, f) {
  return f(self);
}
//# sourceMappingURL=via.js.map