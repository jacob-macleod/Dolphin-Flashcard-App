// ets_tracing: off
import { succeed } from "./core.mjs";
import { fail } from "./fail.mjs";
import { foldM_ } from "./foldM.mjs";
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function bimap(f, g, __trace) {
  return self => bimap_(self, f, g, __trace);
}
/**
 * Returns an effect whose failure and success channels have been mapped by
 * the specified pair of functions, `f` and `g`.
 */

export function bimap_(self, f, g, __trace) {
  return foldM_(self, e => fail(f(e)), a => succeed(g(a)), __trace);
}
//# sourceMappingURL=bimap.mjs.map