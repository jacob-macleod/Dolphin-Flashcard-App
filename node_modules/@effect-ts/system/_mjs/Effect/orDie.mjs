import { orDieWith_ } from "./orDieWith.mjs";
/**
 * Keeps none of the errors, and terminates the fiber with them, using
 * the specified function to convert the `E` into a `unknown`.
 */

export function orDie(effect, __trace) {
  return orDieWith_(effect, e => e, __trace);
}
//# sourceMappingURL=orDie.mjs.map