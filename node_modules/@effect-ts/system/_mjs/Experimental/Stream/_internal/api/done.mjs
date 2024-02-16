// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * The stream that ends with the `Exit` value `exit`.
 */

export function done(exit) {
  return FromEffect.fromEffect(T.done(exit));
}
//# sourceMappingURL=done.mjs.map