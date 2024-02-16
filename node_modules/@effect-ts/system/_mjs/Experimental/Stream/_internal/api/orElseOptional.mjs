// ets_tracing: off
import * as O from "../../../../Option/index.mjs";
import * as CatchAll from "./catchAll.mjs";
import * as Fail from "./fail.mjs";
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 */

export function orElseOptional_(self, that) {
  return CatchAll.catchAll_(self, O.fold(() => that, e => Fail.fail(O.some(e))));
}
/**
 * Switches to the provided stream in case this one fails with the `None` value.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElseOptional_
 */

export function orElseOptional(that) {
  return self => orElseOptional_(self, that);
}
//# sourceMappingURL=orElseOptional.mjs.map