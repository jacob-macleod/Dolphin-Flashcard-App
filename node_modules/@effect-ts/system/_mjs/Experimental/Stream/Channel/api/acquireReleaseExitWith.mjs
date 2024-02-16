// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as C from "../core.mjs";
export function acquireReleaseExitWith_(acquire, use, release) {
  return C.chain_(C.fromEffect(Ref.makeRef(_ => T.unit)), ref => C.ensuringWith_(C.chain_(C.fromEffect(T.uninterruptible(T.tap_(acquire, a => ref.set(_ => release(a, _))))), use), ex => T.chain_(ref.get, _ => _(ex))));
}
/**
 * @ets_data_first acquireReleaseExitWith_
 */

export function acquireReleaseExitWith(use, release) {
  return acquire => acquireReleaseExitWith_(acquire, use, release);
}
//# sourceMappingURL=acquireReleaseExitWith.mjs.map