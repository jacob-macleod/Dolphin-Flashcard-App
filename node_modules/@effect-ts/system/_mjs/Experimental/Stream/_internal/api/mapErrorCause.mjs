import * as CH from "../../Channel/index.mjs";
import * as C from "../core.mjs";
/**
 * Transforms the full causes of failures emitted by this stream.
 */

export function mapErrorCause_(self, f) {
  return new C.Stream(CH.mapErrorCause_(self.channel, f));
}
/**
 * Transforms the full causes of failures emitted by this stream.
 *
 * @ets_data_first mapErrorCause_
 */

export function mapErrorCause(f) {
  return self => mapErrorCause_(self, f);
}
//# sourceMappingURL=mapErrorCause.mjs.map