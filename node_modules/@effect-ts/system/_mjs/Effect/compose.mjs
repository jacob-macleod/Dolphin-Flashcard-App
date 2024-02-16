// ets_tracing: off
import { chain_, provideAll_ } from "./core.mjs";
/**
 * Uses the output of `that` to provide to `self`
 *
 * @ets_data_first compose_
 */

export function compose(that, __trace) {
  return self => compose_(self, that, __trace);
}
/**
 * Uses the output of `that` to provide to `self`
 */

export function compose_(self, that, __trace) {
  return chain_(self, r => provideAll_(that, r), __trace);
}
//# sourceMappingURL=compose.mjs.map