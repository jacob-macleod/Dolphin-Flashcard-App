import * as T from "../../../../Effect/index.mjs";
import * as FromEffect from "./fromEffect.mjs";
/**
 * The stream that always fails with `cause`.
 */

export function failCause(cause) {
  return FromEffect.fromEffect(T.halt(cause));
}
//# sourceMappingURL=failCause.mjs.map