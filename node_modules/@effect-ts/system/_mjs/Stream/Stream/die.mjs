// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * The stream that dies with the error.
 */

export function die(e) {
  return fromEffect(T.die(e));
}
//# sourceMappingURL=die.mjs.map