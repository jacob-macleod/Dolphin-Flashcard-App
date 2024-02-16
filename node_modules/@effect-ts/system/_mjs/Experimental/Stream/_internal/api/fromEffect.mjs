// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as FromEffectOption from "./fromEffectOption.mjs";
/**
 * Creates a stream from an effect producing a value of type `A`
 */

export function fromEffect(fa) {
  return FromEffectOption.fromEffectOption(T.mapError_(fa, O.some));
}
//# sourceMappingURL=fromEffect.mjs.map