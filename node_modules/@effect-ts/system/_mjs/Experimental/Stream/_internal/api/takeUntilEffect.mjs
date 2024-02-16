// ets_tracing: off
import * as CK from "../../../../Collections/Immutable/Chunk/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as LoopOnPartialChunks from "./loopOnPartialChunks.mjs";
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 */

export function takeUntilEffect_(self, f) {
  return LoopOnPartialChunks.loopOnPartialChunks_(self, (chunk, emit) => T.map_(T.let_(T.bind_(T.do, "taken", () => CK.takeWhileEffect_(chunk, v => T.zipRight_(emit(v), T.map_(f(v), _ => !_)))), "last", ({
    taken
  }) => CK.take_(CK.drop_(chunk, CK.size(taken)), 1)), ({
    last
  }) => CK.isEmpty(last)));
}
/**
 * Takes all elements of the stream until the specified effectual predicate
 * evaluates to `true`.
 *
 * @ets_data_first takeUntilEffect_
 */

export function takeUntilEffect(f) {
  return self => takeUntilEffect_(self, f);
}
//# sourceMappingURL=takeUntilEffect.mjs.map