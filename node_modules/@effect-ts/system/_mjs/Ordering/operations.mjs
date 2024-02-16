/**
 * `number` => `Ordering`
 */
export function sign(n) {
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

export function invert(O) {
  switch (O) {
    case -1:
      return 1;

    case 1:
      return -1;

    default:
      return 0;
  }
}
export function combine(x, y) {
  return x !== 0 ? x : y;
}
//# sourceMappingURL=operations.mjs.map