// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import { mapM_ } from "./mapM.mjs";
/**
 * Adds an effect to consumption of every element of the stream.
 */

export function tap_(self, f) {
  return mapM_(self, o => T.as_(f(o), o));
}
/**
 * Adds an effect to consumption of every element of the stream.
 */

export function tap(f) {
  return self => tap_(self, f);
}
//# sourceMappingURL=tap.mjs.map