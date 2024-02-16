// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as LoopOnPartialChunks from "./loopOnPartialChunks.mjs";
/**
 * Loops on chunks elements emitting partially
 */

export function loopOnPartialChunksElements_(self, f) {
  return LoopOnPartialChunks.loopOnPartialChunks_(self, (a, emit) => T.as_(T.forEachUnit_(a, a => f(a, emit)), true));
}
/**
 * Loops on chunks elements emitting partially
 *
 * @ets_data_first loopOnPartialChunksElements_
 */

export function loopOnPartialChunksElements(f) {
  return self => loopOnPartialChunksElements_(self, f);
}
//# sourceMappingURL=loopOnPartialChunksElements.mjs.map