// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as LoopOnPartialChunksElements from "./loopOnPartialChunksElements.mjs";
/**
 * Maps over elements of the stream with the specified effectful function.
 */

export function mapEffect_(self, f) {
  return LoopOnPartialChunksElements.loopOnPartialChunksElements_(self, (a, emit) => T.chain_(f(a), emit));
}
/**
 * Maps over elements of the stream with the specified effectful function.
 *
 * @ets_data_first mapEffect_
 */

export function mapEffect(f) {
  return self => mapEffect_(self, f);
}
//# sourceMappingURL=mapEffect.mjs.map