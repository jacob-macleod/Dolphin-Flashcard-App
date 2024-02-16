"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combine = combine;
exports.invert = invert;
exports.sign = sign;

/**
 * `number` => `Ordering`
 */
function sign(n) {
  if (n < 0) {
    return -1;
  }

  if (n > 0) {
    return 1;
  }

  return 0;
}
/**
 * Invert Ordering
 */


function invert(O) {
  switch (O) {
    case -1:
      return 1;

    case 1:
      return -1;

    default:
      return 0;
  }
}

function combine(x, y) {
  return x !== 0 ? x : y;
}
//# sourceMappingURL=operations.js.map