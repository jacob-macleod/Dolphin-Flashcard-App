// ets_tracing: off
import { MASK } from "../Config/index.mjs"; // Bit Ops

/**
 * Hamming weight.
 *
 * Taken from: http://jsperf.com/hamming-weight
 */

export function popcount(x) {
  x -= x >> 1 & 0x55555555;
  x = (x & 0x33333333) + (x >> 2 & 0x33333333);
  x = x + (x >> 4) & 0x0f0f0f0f;
  x += x >> 8;
  x += x >> 16;
  return x & 0x7f;
}
export function hashFragment(shift, h) {
  return h >>> shift & MASK;
}
export function toBitmap(x) {
  return 1 << x;
}
export function fromBitmap(bitmap, bit) {
  return popcount(bitmap & bit - 1);
}
//# sourceMappingURL=index.mjs.map