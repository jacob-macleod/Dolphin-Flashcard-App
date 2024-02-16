// ets_tracing: off
import * as CS from "../../../../Cause/index.mjs";
import * as HM from "../../../../Collections/Immutable/HashMap/index.mjs";
import * as L from "../../../../Collections/Immutable/List/index.mjs";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../../../Effect/index.mjs";
import * as Ex from "../../../../Exit/index.mjs";
import { pipe } from "../../../../Function/index.mjs";
import * as M from "../../../../Managed/index.mjs";
import * as O from "../../../../Option/index.mjs";
import * as Q from "../../../../Queue/index.mjs";
import * as Ref from "../../../../Ref/index.mjs";
import * as SM from "../../../../Semaphore/index.mjs";
import * as AR from "../../../../Support/AtomicNumber/index.mjs";
import * as RunForEachManaged from "./runForEachManaged.mjs";
const distributedWithDynamicId = /*#__PURE__*/new AR.AtomicNumber(0);
/**
 * More powerful version of `Stream#distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */

export function distributedWithDynamic_(self, maximumLag, decide, done) {
  return M.map_(M.bind_(M.bind_(M.do, "queuesRef", () => T.toManagedRelease_(Ref.makeRef(HM.make()), _ => T.chain_(Ref.get(_), qs => T.forEach_(HM.values(qs), _ => Q.shutdown(_))))), "add", ({
    queuesRef
  }) => {
    const offer = a => T.asUnit(T.tap_(T.bind_(T.bind_(T.do, "shouldProcess", () => decide(a)), "queues", () => Ref.get(queuesRef)), ({
      queues,
      shouldProcess
    }) => T.chain_(T.reduce_(queues, L.empty(), (acc, [id, queue]) => {
      if (shouldProcess(id)) {
        return T.foldCauseM_(Q.offer_(queue, Ex.succeed(a)), c => CS.interrupted(c) ? T.succeed(L.prepend_(acc, id)) : T.halt(c), _ => T.succeed(acc));
      } else {
        return T.succeed(acc);
      }
    }), ids => L.isEmpty(ids) ? T.unit : Ref.update_(queuesRef, HM.removeMany(ids)))));

    return M.map_(M.tap_(M.let_(M.bind_(M.bind_(M.do, "queuesLock", () => T.toManaged(SM.makeSemaphore(1))), "newQueue", () => T.toManaged(Ref.makeRef(T.map_(T.tap_(T.bind_(T.bind_(T.do, "queue", () => Q.makeBounded(maximumLag)), "id", () => T.succeedWith(() => distributedWithDynamicId.incrementAndGet())), ({
      id,
      queue
    }) => Ref.update_(queuesRef, HM.set(id, queue))), ({
      id,
      queue
    }) => Tp.tuple(id, queue))))), "finalize", ({
      newQueue,
      queuesLock
    }) => endTake => SM.withPermit_(T.asUnit(T.tap_(T.tap_(T.bind_(T.tap_(T.do, () => Ref.set_(newQueue, T.map_(T.tap_(T.bind_(T.tap_(T.bind_(T.do, "queue", () => Q.makeBounded(1)), ({
      queue
    }) => Q.offer_(queue, endTake)), "id", () => T.succeedWith(() => distributedWithDynamicId.incrementAndGet())), ({
      id,
      queue
    }) => Ref.update_(queuesRef, HM.set(id, queue))), ({
      id,
      queue
    }) => Tp.tuple(id, queue)))), "queues", () => T.map_(Ref.get(queuesRef), HM.values)), ({
      queues
    }) => T.forEach_(queues, queue => T.catchSomeCause_(Q.offer_(queue, endTake), c => {
      if (CS.interrupted(c)) {
        return O.some(T.unit);
      } else {
        return O.none;
      }
    }))), _ => done(endTake))), queuesLock)), ({
      finalize
    }) => M.fork(M.foldCauseM_(RunForEachManaged.runForEachManaged_(self, offer), cause => T.toManaged(finalize(Ex.halt(CS.map_(cause, O.some)))), _ => T.toManaged(finalize(Ex.fail(O.none)))))), ({
      newQueue,
      queuesLock
    }) => SM.withPermit_(T.flatten(Ref.get(newQueue)), queuesLock));
  }), ({
    add
  }) => add);
}
/**
 * More powerful version of `Stream#distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 *
 * @ets_data_first distributedWithDynamic_
 */

export function distributedWithDynamic(maximumLag, decide, done) {
  return self => distributedWithDynamic_(self, maximumLag, decide, done);
}
//# sourceMappingURL=distributedWithDynamic.mjs.map