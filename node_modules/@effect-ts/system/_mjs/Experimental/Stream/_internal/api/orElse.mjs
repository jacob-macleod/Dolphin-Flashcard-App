// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 */

export function orElse_(self, that) {
  return new C.Stream(CH.orElse_(self.channel, that.channel));
}
/**
 * Switches to the provided stream in case this one fails with a typed error.
 *
 * See also `Stream#catchAll`.
 *
 * @ets_data_first orElse_
 */

export function orElse(that) {
  return self => orElse_(self, that);
}
//# sourceMappingURL=orElse.mjs.map