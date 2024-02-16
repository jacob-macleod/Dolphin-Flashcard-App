import * as T from "../_internal/effect.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * The stream that ends with the `Exit` value `exit`.
 */

export function done(exit) {
  return fromEffect(T.done(exit));
}
//# sourceMappingURL=done.mjs.map