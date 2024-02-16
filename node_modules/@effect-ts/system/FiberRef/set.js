"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.set = set;
exports.set_ = set_;

/**
 * Sets the value associated with the current fiber.
 *
 * @ets_data_first set_
 */
function set(a) {
  return fiberRef => set_(fiberRef, a);
}
/**
 * Sets the value associated with the current fiber.
 */


function set_(fiberRef, a) {
  return fiberRef.set(a);
}
//# sourceMappingURL=set.js.map