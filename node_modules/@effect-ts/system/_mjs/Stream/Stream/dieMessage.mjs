// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * The stream that dies with an exception described by `msg`.
 */

export function dieMessage(msg) {
  fromEffect(T.dieMessage(msg));
}
//# sourceMappingURL=dieMessage.mjs.map