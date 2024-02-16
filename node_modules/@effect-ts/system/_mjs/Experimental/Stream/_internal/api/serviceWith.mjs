// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Accesses the specified service in the environment of the stream in the
 * context of an effect.
 */

export function serviceWith(s) {
  return f => FromEffect.fromEffect(T.accessServiceM(s)(f));
}
//# sourceMappingURL=serviceWith.mjs.map