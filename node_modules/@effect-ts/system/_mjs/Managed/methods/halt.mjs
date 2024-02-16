import * as T from "../deps.mjs";
import { fromEffect } from "../fromEffect.mjs";
/**
 * Returns an effect that models failure with the specified `Cause`.
 */

export function halt(self, __trace) {
  return fromEffect(T.halt(self), __trace);
}
/**
 * Returns an effect that models failure with the specified `Cause`.
 */

export function haltWith(self, __trace) {
  return fromEffect(T.haltWith(self, __trace));
}
//# sourceMappingURL=halt.mjs.map