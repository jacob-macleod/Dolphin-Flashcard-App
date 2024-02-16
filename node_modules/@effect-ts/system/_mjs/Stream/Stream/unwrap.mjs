import { flatten } from "./flatten.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * Creates a stream produced from an effect
 */

export function unwrap(fa) {
  return flatten(fromEffect(fa));
}
//# sourceMappingURL=unwrap.mjs.map