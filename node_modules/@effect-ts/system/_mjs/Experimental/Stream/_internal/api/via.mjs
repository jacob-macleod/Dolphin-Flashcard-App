/**
 * Threads the stream through the transformation function `f`.
 */
export function via_(self, f) {
  return f(self);
}
/**
 * Threads the stream through the transformation function `f`.
 *
 * @ets_data_first via_
 */

export function via(f) {
  return self => via_(self, f);
}
//# sourceMappingURL=via.mjs.map