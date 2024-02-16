// ets_tracing: off
import * as T from "../../../Effect/index.mjs";
import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Creates a sink produced from an effect.
 */

export function unwrap(managed) {
  return new C.Sink(CH.unwrap(T.map_(managed, _ => _.channel)));
}
//# sourceMappingURL=unwrap.mjs.map