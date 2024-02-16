// ets_tracing: off
import { chain_ } from "./core.mjs";
import { flipWith_ } from "./flipWith.mjs";
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 *
 * @ets_data_first chainError_
 */

export function chainError(f, __trace) {
  return self => chainError_(self, f, __trace);
}
/**
 * Creates a composite effect that represents this effect followed by another
 * one that may depend on the error produced by this one.
 */

export function chainError_(self, f, __trace) {
  return flipWith_(self, x => chain_(x, f, __trace));
}
//# sourceMappingURL=chainError.mjs.map