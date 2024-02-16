import * as L from "../Layer/core.mjs";
/**
 * Constructs a layer from this effect.
 */

export function toLayerRaw(effect) {
  return L.fromRawEffect(effect);
}
/**
 * Constructs a layer from this effect.
 */

export function toLayer(tag) {
  return effect => L.fromEffect_(effect, tag);
}
//# sourceMappingURL=toLayer.mjs.map