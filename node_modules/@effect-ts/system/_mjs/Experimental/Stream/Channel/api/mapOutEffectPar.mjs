// ets_tracing: off
import * as T from "../../../../Effect/index.mjs";
import * as E from "../../../../Either/index.mjs";
import * as F from "../../../../Fiber/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as P from "../../../../Promise/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as SM from "../../../../Semaphore/index.mjs";
import * as C from "../core.mjs";
import * as Managed from "./managed.mjs";
import * as ToPull from "./toPull.mjs";
import * as Unwrap from "./unwrap.mjs";
import * as ZipRight from "./zipRight.mjs";
export function mapOutEffectPar_(self, n, f) {
  return Managed.managed_(M.withChildren(getChildren => M.map_(M.tap_(M.bind_(M.bind_(M.bind_(M.bind_(M.tap_(M.do, () => M.finalizer(T.chain_(getChildren, F.interruptAll))), "queue", () => T.toManagedRelease_(Q.makeBounded(n), Q.shutdown)), "errorSignal", () => P.makeManaged()), "permits", () => T.toManaged(SM.makeSemaphore(n))), "pull", () => ToPull.toPull(self)), ({
    errorSignal,
    permits,
    pull,
    queue
  }) => T.forkManaged(T.interruptible(T.forever(T.foldCauseM_(pull, cause => Q.offer_(queue, T.halt(cause)), E.fold(outDone => T.asUnit(T.zipRight_(T.interruptible(SM.withPermits_(T.unit, permits, n)), Q.offer_(queue, T.succeed(E.left(outDone))))), outElem => T.asUnit(T.tap_(T.tap_(T.tap_(T.bind_(T.bind_(T.do, "p", () => P.make()), "latch", () => P.make()), ({
    p
  }) => Q.offer_(queue, T.map_(P.await(p), E.right))), ({
    latch,
    p
  }) => T.fork(SM.withPermit_(T.zipRight_(P.succeed_(latch, void 0), T.to_(T.tapCause_(T.raceFirst_(P.await(errorSignal), f(outElem)), _ => P.halt_(errorSignal, _)), p)), permits))), ({
    latch
  }) => P.await(latch))))))))), ({
    queue
  }) => queue)), queue => {
    const consumer = Unwrap.unwrap(T.foldCause_(T.flatten(Q.take(queue)), _ => C.failCause(_), E.fold(outDone => C.end(outDone), outElem => ZipRight.zipRight_(C.write(outElem), consumer))));
    return consumer;
  });
}
/**
 * @ets_data_first mapOutEffectPar_
 */

export function mapOutEffectPar(n, f) {
  return self => mapOutEffectPar_(self, n, f);
}
//# sourceMappingURL=mapOutEffectPar.mjs.map