import * as Tp from "../../../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../../../Exit/index.mjs";
import { pipe } from "../../../Function/index.mjs";
import * as P from "../../../Promise/index.mjs";
import * as Q from "../../../Queue/index.mjs";
import * as T from "../../_internal/effect.mjs";
import * as M from "../../_internal/managed.mjs";
import * as Ref from "../../_internal/ref.mjs";
import * as Pull from "../../Pull/index.mjs";
import * as Take from "../../Take/index.mjs";
/**
 * Allows a faster producer to progress independently of a slower consumer by buffering
 * to the provided queue.
 */

export function bufferSignal(self, queue) {
  return M.map_(M.let_(M.tap_(M.let_(M.bind_(M.bind_(M.tap_(M.bind_(M.bind_(M.do, "as", () => self.proc), "start", () => T.toManaged(P.make())), ({
    start
  }) => T.toManaged(P.succeed_(start, undefined))), "ref", ({
    start
  }) => T.toManaged(Ref.makeRef(start))), "done", () => T.toManaged(Ref.makeRef(false))), "upstream", ({
    as,
    ref
  }) => {
    const offer = take => Ex.fold_(take, _ => T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.tap_(T.bind_(T.do, "latch", () => ref.get), ({
      latch
    }) => P.await(latch)), "p", () => P.make()), ({
      p
    }) => Q.offer_(queue, Tp.tuple(take, p))), ({
      p
    }) => ref.set(p)), ({
      p
    }) => P.await(p))), _ => T.asUnit(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "added", ({
      p
    }) => Q.offer_(queue, Tp.tuple(take, p))), ({
      added,
      p
    }) => T.when_(ref.set(p), () => added))));

    return T.asUnit(T.repeatWhile_(T.tap_(Take.fromPull(as), take => offer(take)), _ => _ !== Take.end));
  }), ({
    upstream
  }) => M.fork(T.toManaged(upstream))), "pull", ({
    done
  }) => T.chain_(done.get, _ => {
    if (_) {
      return Pull.end;
    } else {
      return T.chain_(Q.take(queue), ({
        tuple: [take, p]
      }) => T.zipRight_(T.zipRight_(P.succeed_(p, undefined), T.when_(done.set(true), () => take === Take.end)), Take.done(take)));
    }
  })), ({
    pull
  }) => pull);
}
//# sourceMappingURL=bufferSignal.mjs.map