// ets_tracing: off
import * as O from "../../Option/index.mjs";
import { catchAll_ } from "./catchAll.mjs";
import { fail } from "./fail.mjs";
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 */

export function orElseOptional_(self, that) {
  return catchAll_(self, O.fold(() => that, e => fail(O.some(e))));
}
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 */

export function orElseOptional(that) {
  return self => orElseOptional_(self, that);
}
//# sourceMappingURL=orElseOptional.mjs.map