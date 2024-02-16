// ets_tracing: off
import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Transforms the errors emitted by this stream using `f`.
 */

export function mapError_(self, f) {
  return new C.Stream(CH.mapError_(self.channel, f));
}
/**
 * Transforms the errors emitted by this stream using `f`.
 *
 * @ets_data_first mapError_
 */

export function mapError(f) {
  return self => mapError_(self, f);
}
//# sourceMappingURL=mapError.mjs.map