// ets_tracing: off
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
export function orElse_(self, that) {
  return new C.Sink(CH.orElse_(self.channel, that.channel));
}
/**
 * @ets_data_first orElse_
 */

export function orElse(that) {
  return self => orElse_(self, that);
}
//# sourceMappingURL=orElse.mjs.map