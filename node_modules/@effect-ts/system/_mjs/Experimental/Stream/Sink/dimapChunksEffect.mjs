import * as ContramapChunksEffect from "./contramapChunksEffect.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 */

export function dimapChunksEffect_(self, f, g) {
  return MapEffect.mapEffect_(ContramapChunksEffect.contramapChunksEffect_(self, f), g);
}
/**
 * Effectfully transforms both input chunks and result of this sink using the provided functions.
 * `f` and `g` must preserve chunking-invariance
 *
 * @ets_data_first dimapChunksEffect_
 */

export function dimapChunksEffect(f, g) {
  return self => dimapChunksEffect_(self, f, g);
}
//# sourceMappingURL=dimapChunksEffect.mjs.map