/**
 * Sets the value associated with the current fiber.
 *
 * @ets_data_first set_
 */
export function set(a) {
  return fiberRef => set_(fiberRef, a);
}
/**
 * Sets the value associated with the current fiber.
 */

export function set_(fiberRef, a) {
  return fiberRef.set(a);
}
//# sourceMappingURL=set.mjs.map