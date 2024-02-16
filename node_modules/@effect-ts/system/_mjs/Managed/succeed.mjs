// ets_tracing: off
import * as T from "./deps.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * Lift a pure value into an effect
 */

export function succeed(a, __trace) {
  return fromEffect(T.succeed(a), __trace);
}
//# sourceMappingURL=succeed.mjs.map