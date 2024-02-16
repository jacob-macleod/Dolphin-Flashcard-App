"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.via = via;
exports.via_ = via_;

/**
 * Threads the stream through the transformation function `f`.
 */
function via_(self, f) {
  return f(self);
}
/**
 * Threads the stream through the transformation function `f`.
 *
 * @ets_data_first via_
 */


function via(f) {
  return self => via_(self, f);
}
//# sourceMappingURL=via.js.map