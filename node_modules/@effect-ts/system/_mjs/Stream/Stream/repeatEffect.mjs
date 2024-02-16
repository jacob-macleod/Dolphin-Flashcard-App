// ets_tracing: off
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import { repeatEffectOption } from "./repeatEffectOption.mjs";
/**
 * Creates a stream from an effect producing a value of type `A` which repeats forever.
 */

export function repeatEffect(fa) {
  return repeatEffectOption(T.mapError_(fa, O.some));
}
//# sourceMappingURL=repeatEffect.mjs.map