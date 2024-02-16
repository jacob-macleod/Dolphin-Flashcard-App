/**
 * Returns an `Effect` that runs with `value` bound to the current fiber.
 *
 * Guarantees that fiber data is properly restored via `bracket`.
 *
 * @ets_data_first locally_
 */
export function locally(value) {
  return fiberRef => locally_(fiberRef, value);
}
/**
 * Returns an `Effect` that runs with `value` bound to the current fiber.
 *
 * Guarantees that fiber data is properly restored via `bracket`.
 */

export function locally_(fiberRef, value) {
  return effect => fiberRef.locally(value, effect);
}
//# sourceMappingURL=locally.mjs.map