// ets_tracing: off
import { chain_, provideAll_ } from "./core.mjs";
/**
 * Propagates the given environment to self.
 *
 * @ets_data_first andThen_
 */

export function andThen(fb, __trace) {
  return fa => andThen_(fa, fb, __trace);
}
/**
 * Propagates the given environment to self.
 */

export function andThen_(fa, fb, __trace) {
  return chain_(fa, a => provideAll_(fb, a), __trace);
}
//# sourceMappingURL=andThen.mjs.map