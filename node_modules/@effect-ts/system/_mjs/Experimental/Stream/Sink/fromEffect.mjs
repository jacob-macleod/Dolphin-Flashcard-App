import * as CH from "../Channel/index.mjs";
import * as C from "./core.mjs";
/**
 * Creates a single-value sink produced from an effect
 */

export function fromEffect(b) {
  return new C.Sink(CH.fromEffect(b));
}
//# sourceMappingURL=fromEffect.mjs.map