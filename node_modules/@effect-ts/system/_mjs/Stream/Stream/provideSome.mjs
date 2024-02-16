// ets_tracing: off
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */

export function provideSome_(self, f) {
  return new Stream(M.map_(M.provideSome_(self.proc, f), T.provideSome(f)));
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */

export function provideSome(f) {
  return self => provideSome_(self, f);
}
//# sourceMappingURL=provideSome.mjs.map