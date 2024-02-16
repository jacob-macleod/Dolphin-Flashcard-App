import { flip } from "./flip.mjs";
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 *
 * @ets_data_first flipWith_
 */

export function flipWith(f, __trace) {
  return self => flipWith_(self, f, __trace);
}
/**
 * Swaps the error/value parameters, applies the function `f` and flips the parameters back
 */

export function flipWith_(self, f, __trace) {
  return flip(f(flip(self)), __trace);
}
//# sourceMappingURL=flipWith.mjs.map