"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locally = locally;
exports.locally_ = locally_;

/**
 * Returns an `Effect` that runs with `value` bound to the current fiber.
 *
 * Guarantees that fiber data is properly restored via `bracket`.
 *
 * @ets_data_first locally_
 */
function locally(value) {
  return fiberRef => locally_(fiberRef, value);
}
/**
 * Returns an `Effect` that runs with `value` bound to the current fiber.
 *
 * Guarantees that fiber data is properly restored via `bracket`.
 */


function locally_(fiberRef, value) {
  return effect => fiberRef.locally(value, effect);
}
//# sourceMappingURL=locally.js.map