// ets_tracing: off
import { NoSuchElementException } from "../GlobalExceptions/index.mjs";
import { someOrFail_ } from "./someOrFail.mjs";
/**
 * Extracts the optional value, or fails with a `NoSuchElementException`
 */

export function someOrFailException(self, __trace) {
  return someOrFail_(self, () => new NoSuchElementException(), __trace);
}
//# sourceMappingURL=someOrFailException.mjs.map