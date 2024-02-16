import * as C from "../core.mjs";
import * as Flatten from "./flatten.mjs";
/**
 * Makes a channel from an effect that returns a channel in case of success
 */

export function unwrap(self) {
  return Flatten.flatten(C.fromEffect(self));
}
//# sourceMappingURL=unwrap.mjs.map