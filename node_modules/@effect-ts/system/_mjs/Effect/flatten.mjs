// ets_tracing: off
import { identity } from "../Function/index.mjs";
import { chain_ } from "./core.mjs";
/**
 * Returns an effect that first executes the outer effect, and then executes
 * the inner effect, returning the value from the inner effect, and effectively
 * flattening a nested effect.
 */

export function flatten(effect, __trace) {
  return chain_(effect, identity, __trace);
}
//# sourceMappingURL=flatten.mjs.map