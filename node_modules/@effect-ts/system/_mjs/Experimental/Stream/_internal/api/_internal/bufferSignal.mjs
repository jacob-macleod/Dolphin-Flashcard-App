import * as Tp from "../../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../../Effect/index.mjs";
import { pipe } from "../../../../../Function/index.mjs";
import * as M from "../../../../../Managed/index.mjs";
import * as P from "../../../../../Promise/index.mjs";
import * as Q from "../../../../../Queue/index.mjs";
import * as Ref from "../../../../../Ref/index.mjs";
import * as CH from "../../../Channel/index.mjs";
import * as TK from "../../../Take/index.mjs";
export function bufferSignal(managed, channel) {
  const producer = (queue, ref) => {
    const terminate = take => CH.fromEffect(T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.tap_(T.bind_(T.do, "latch", () => ref.get), ({
      latch
    }) => P.await(latch)), "p", () => P.make()), ({
      p
    }) => Q.offer_(queue, Tp.tuple(take, p))), ({
      p
    }) => ref.set(p)), ({
      p
    }) => P.await(p))));

    return CH.readWith(_in => CH.zipRight_(CH.fromEffect(T.asUnit(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "added", ({
      p
    }) => Q.offer_(queue, Tp.tuple(TK.chunk(_in), p))), ({
      added,
      p
    }) => T.when_(ref.set(p), () => added)))), producer(queue, ref)), err => terminate(TK.fail(err)), _ => terminate(TK.end));
  };

  const consumer = queue => {
    const process = CH.chain_(CH.fromEffect(Q.take(queue)), ({
      tuple: [take, promise]
    }) => CH.zipRight_(CH.fromEffect(P.succeed_(promise, undefined)), TK.fold_(take, CH.end(undefined), error => CH.failCause(error), value => CH.zipRight_(CH.write(value), process))));
    return process;
  };

  return CH.managed_(M.map_(M.tap_(M.bind_(M.tap_(M.bind_(M.bind_(M.do, "queue", () => managed), "start", () => T.toManaged(P.make())), ({
    start
  }) => T.toManaged(P.succeed_(start, undefined))), "ref", ({
    start
  }) => Ref.makeManagedRef(start)), ({
    queue,
    ref
  }) => M.fork(CH.runManaged(channel[">>>"](producer(queue, ref))))), ({
    queue
  }) => queue), queue => consumer(queue));
}
//# sourceMappingURL=bufferSignal.mjs.map