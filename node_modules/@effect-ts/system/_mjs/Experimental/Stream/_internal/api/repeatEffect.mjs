// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as RepeatEffectOption from "./repeatEffectOption.mjs";
/**
 * Creates a stream from an effect producing a value of type `A` which repeats forever.
 */

export function repeatEffect(fa) {
  return RepeatEffectOption.repeatEffectOption(T.mapError_(fa, O.some));
}
//# sourceMappingURL=repeatEffect.mjs.map