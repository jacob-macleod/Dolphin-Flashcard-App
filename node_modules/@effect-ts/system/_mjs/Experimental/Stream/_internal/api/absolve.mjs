// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as MapEffect from "./mapEffect.mjs";
/**
 * Submerges the error case of an `Either` into the `Stream`.
 */

export function absolve(xs) {
  return MapEffect.mapEffect_(xs, _ => T.fromEither(() => _));
}
//# sourceMappingURL=absolve.mjs.map