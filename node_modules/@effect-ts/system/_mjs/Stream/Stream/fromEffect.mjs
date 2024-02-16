// ets_tracing: off
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import { fromEffectOption } from "./fromEffectOption.mjs";
/**
 * Creates a stream from an effect producing a value of type `A`
 */

export function fromEffect(fa) {
  return fromEffectOption(T.mapError_(fa, O.some));
}
//# sourceMappingURL=fromEffect.mjs.map