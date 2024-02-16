import * as ChainPar from "./chainPar.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 */

export function mapEffectParUnordered_(self, n, f) {
  return ChainPar.chainPar_(self, n, a => FromEffect.fromEffect(f(a)));
}
/**
 * Maps over elements of the stream with the specified effectful function,
 * executing up to `n` invocations of `f` concurrently. The element order
 * is not enforced by this combinator, and elements may be reordered.
 *
 * @ets_data_first mapEffectParUnordered_
 */

export function mapEffectParUnordered(n, f) {
  return self => mapEffectParUnordered_(self, n, f);
}
//# sourceMappingURL=mapEffectParUnordered.mjs.map