// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as AccessServiceEffect from "./accessServiceEffect.mjs";
/**
 * Accesses the specified service in the environment of the effect.
 */

export function service(s) {
  return AccessServiceEffect.accessServiceEffect(s)(T.succeed);
}
//# sourceMappingURL=service.mjs.map