import * as Effect from "./effect.mjs";
import * as Flatten from "./flatten.mjs";
/**
 * Creates a stream produced from an effect
 */

export function unwrap(self) {
  return Flatten.flatten(Effect.effect(self));
}
//# sourceMappingURL=unwrap.mjs.map