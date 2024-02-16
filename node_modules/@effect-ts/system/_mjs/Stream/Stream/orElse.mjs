// ets_tracing: off
import { catchAll_ } from "./catchAll.mjs";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElse_(self, that) {
  return catchAll_(self, _ => that);
}
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElse(that) {
  return self => orElse_(self, that);
}
//# sourceMappingURL=orElse.mjs.map