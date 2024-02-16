"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromBitmap = fromBitmap;
exports.hashFragment = hashFragment;
exports.popcount = popcount;
exports.toBitmap = toBitmap;

var _index = /*#__PURE__*/require("../Config/index.js");

// ets_tracing: off
// Bit Ops

/**
 * Hamming weight.
 *
 * Taken from: http://jsperf.com/hamming-weight
 */
function popcount(x) {
  x -= x >> 1 & 0x55555555;
  x = (x & 0x33333333) + (x >> 2 & 0x33333333);
  x = x + (x >> 4) & 0x0f0f0f0f;
  x += x >> 8;
  x += x >> 16;
  return x & 0x7f;
}

function hashFragment(shift, h) {
  return h >>> shift & _index.MASK;
}

function toBitmap(x) {
  return 1 << x;
}

function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}
//# sourceMappingURL=index.js.map