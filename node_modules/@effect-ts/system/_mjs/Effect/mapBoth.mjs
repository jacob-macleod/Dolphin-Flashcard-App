// ets_tracing: off
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function mapBoth_(self, f, g, __trace) {
  return foldM_(self, e => fail(f(e)), a => succeed(g(a)), __trace);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 *
 * @ets_data_first mapBoth_
 */

export function mapBoth(f, g, __trace) {
  return self => mapBoth_(self, f, g, __trace);
}
//# sourceMappingURL=mapBoth.mjs.map