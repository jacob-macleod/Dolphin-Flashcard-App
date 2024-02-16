// ets_tracing: off
import * as A from "../../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../Effect/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as H from "../../../Hub/index.mjs";
import * as M from "../../../Managed/index.mjs";
import * as RefM from "../../../RefM/index.mjs";
import * as S from "../index.mjs";
/**
 * A `SubscriptionRef<A>` contains a `RefM` with a value of type
 * `A` and a `Stream` that can be subscribed to in order to receive the
 * current value as well as all changes to the value.
 */

export class SubscriptionRef {
  constructor(ref, changes) {
    this.ref = ref;
    this.changes = changes;
  }

}
/**
 * Creates a new `SubscriptionRef` with the specified value.
 */

export function make(a) {
  return T.map_(T.let_(T.bind_(T.bind_(T.do, "ref", () => RefM.makeRefM(a)), "hub", () => H.makeUnbounded()), "changes", ({
    hub,
    ref
  }) => S.unwrapManaged(M.managedApply(T.uninterruptible(RefM.modify_(ref, a => T.zipWith_(T.succeed(a), H.subscribe(hub).effect, (a, {
    tuple: [finalizer, queue]
  }) => Tp.tuple(Tp.tuple(finalizer, S.concat_(S.fromChunk(A.single(a)), S.fromQueue()(queue))), a))))))), ({
    changes,
    hub,
    ref
  }) => new SubscriptionRef(RefM.tapInput_(ref, _ => H.publish_(hub, _)), changes));
}
//# sourceMappingURL=index.mjs.map