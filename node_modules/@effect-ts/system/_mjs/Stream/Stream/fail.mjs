// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { fromEffect } from "./fromEffect.mjs";
/**
 * The stream that always fails with the error
 */

export function fail(e) {
  return fromEffect(T.fail(e));
}
//# sourceMappingURL=fail.mjs.map