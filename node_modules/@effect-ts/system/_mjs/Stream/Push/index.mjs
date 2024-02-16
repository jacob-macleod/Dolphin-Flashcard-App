// ets_tracing: off
import "../../Operator/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as E from "../../Either/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as R from "../_internal/ref.mjs";
export function emit(z, leftover) {
  return T.fail(Tp.tuple(E.right(z), leftover));
}
export function fail(e, leftover) {
  return T.fail(Tp.tuple(E.left(e), leftover));
}
export function halt(c) {
  return T.mapError_(T.halt(c), e => Tp.tuple(E.left(e), A.empty()));
}
export const more = T.unit;
/**
 * Decorates a Push with a Effect value that re-initializes it with a fresh state.
 */

export function restartable(sink) {
  return M.map_(M.bind_(M.bind_(M.bind_(M.do, "switchSink", () => M.switchable()), "initialSink", ({
    switchSink
  }) => T.toManaged(switchSink(sink))), "currSink", ({
    initialSink
  }) => T.toManaged(R.makeRef(initialSink))), ({
    currSink,
    switchSink
  }) => {
    const restart = T.chain_(switchSink(sink), currSink.set);

    const newPush = input => T.chain_(currSink.get, f => f(input));

    return Tp.tuple(newPush, restart);
  });
}
//# sourceMappingURL=index.mjs.map