// ets_tracing: off
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as Ref from "../_internal/ref.mjs";
import * as Pull from "../Pull/index.mjs";
import { Stream } from "./definitions.mjs";
/**
 * Creates a single-valued stream from a managed resource
 */

export function managed(self) {
  return new Stream(M.map_(M.let_(M.bind_(M.bind_(M.do, "doneRef", () => Ref.makeManagedRef(false)), "finalizer", () => M.makeManagedReleaseMap(T.sequential)), "pull", ({
    doneRef,
    finalizer
  }) => T.uninterruptibleMask(({
    restore
  }) => T.chain_(doneRef.get, done => done ? Pull.end : T.mapError_(T.map_(T.tap_(T.bind_(T.do, "a", () => T.onError_(restore(T.provideSome_(T.map_(self.effect, ({
    tuple: [_, __]
  }) => __), r => Tp.tuple(r, finalizer))), () => doneRef.set(true))), () => doneRef.set(true)), ({
    a
  }) => A.single(a)), O.some)))), ({
    pull
  }) => pull));
}
//# sourceMappingURL=managed.mjs.map