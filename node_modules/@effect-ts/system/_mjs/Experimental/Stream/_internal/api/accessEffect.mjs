import * as Environment from "./environment.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Accesses the environment of the stream in the context of an effect.
 */

export function accessEffect(f) {
  return MapEffect.mapEffect_(Environment.environment(), f);
}
//# sourceMappingURL=accessEffect.mjs.map