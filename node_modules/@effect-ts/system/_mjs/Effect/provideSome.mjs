// ets_tracing: off
import * as core from "./core.mjs";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */

export function provideSome_(effect, f, __trace) {
  return core.accessM(r0 => core.provideAll_(effect, f(r0)), __trace);
}
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 *
 * @ets_data_first provideSome_
 */

export function provideSome(f, __trace) {
  return effect => provideSome_(effect, f, __trace);
}
//# sourceMappingURL=provideSome.mjs.map