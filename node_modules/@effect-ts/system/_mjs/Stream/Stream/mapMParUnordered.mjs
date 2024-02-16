// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import { chainPar } from "./chainPar.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 */

export function mapMParUnordered(n) {
  return f => self => chainPar(n)(a => fromEffect(f(a)))(self);
}
//# sourceMappingURL=mapMParUnordered.mjs.map