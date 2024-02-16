// ets_tracing: off
import { chain_, tryCatch } from "./core.mjs";
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 */

export function mapTryCatch_(self, f, onThrow, __trace) {
  return chain_(self, a => tryCatch(() => f(a), onThrow, __trace));
}
/**
 * Returns an effect whose success is mapped by the specified side effecting
 * `f` function, translating any thrown exceptions into typed failed effects.
 *
 * @ets_data_first mapTryCatch_
 */

export function mapTryCatch(f, onThrow, __trace) {
  return self => mapTryCatch_(self, f, onThrow, __trace);
}
//# sourceMappingURL=mapTryCatch.mjs.map