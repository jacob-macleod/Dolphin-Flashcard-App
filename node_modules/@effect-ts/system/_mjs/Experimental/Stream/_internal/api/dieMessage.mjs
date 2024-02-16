// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * The stream that dies with an exception described by `msg`.
 */

export function dieMessage(msg) {
  return FromEffect.fromEffect(T.dieMessage(msg));
}
//# sourceMappingURL=dieMessage.mjs.map