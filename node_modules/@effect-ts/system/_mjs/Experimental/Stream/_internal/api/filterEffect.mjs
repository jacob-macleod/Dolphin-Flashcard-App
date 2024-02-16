// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as LoopOnPartialChunksElements from "./loopOnPartialChunksElements.mjs";
/**
 * Effectfully filters the elements emitted by this stream.
 */

export function filterEffect_(self, f) {
  return LoopOnPartialChunksElements.loopOnPartialChunksElements_(self, (a, emit) => T.chain_(f(a), r => r ? emit(a) : T.unit));
}
/**
 * Effectfully filters the elements emitted by this stream.
 *
 * @ets_data_first filterEffect_
 */

export function filterEffect(f) {
  return self => filterEffect_(self, f);
}
//# sourceMappingURL=filterEffect.mjs.map