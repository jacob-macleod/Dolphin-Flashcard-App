// ets_tracing: off
import * as C from "../../Cause/index.mjs";
import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as Map from "../../Collections/Immutable/Map/index.mjs";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Q from "../../Queue/index.mjs";
import * as SM from "../../Semaphore/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as M from "../_internal/managed.mjs";
import * as R from "../_internal/ref.mjs";
import * as forEach from "./forEach.mjs";
/**
 * More powerful version of `distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */

export function distributedWithDynamic(maximumLag, decide, done = _ => T.unit) {
  return stream => distributedWithDynamic_(stream, maximumLag, decide, done);
}

function offer(o, queuesRef, decide) {
  return T.chain_(T.bind_(T.bind_(T.do, "shouldProcess", () => decide(o)), "queues", () => queuesRef.get), ({
    queues,
    shouldProcess
  }) => T.chain_(T.reduce_(queues, A.empty(), (acc, [id, queue]) => {
    if (shouldProcess(id)) {
      return T.foldCauseM_(Q.offer_(queue, Ex.succeed(o)), c => C.interrupted(c) ? T.succeed(A.concat_(A.single(id), acc)) : T.halt(c), () => T.succeed(acc));
    } else {
      return T.succeed(acc);
    }
  }), ids => !A.isEmpty(ids) ? R.update_(queuesRef, Map.removeMany(ids)) : T.unit));
}
/**
 * More powerful version of `distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */


export function distributedWithDynamic_(self, maximumLag, decide, done = _ => T.unit) {
  return M.map_(M.bind_(M.bind_(M.do, "queuesRef", () => (acquire => T.toManagedRelease_(acquire, _ => T.chain_(_.get, qs => T.forEach_(qs.values(), Q.shutdown))))(R.makeRef(Map.empty))), "add", ({
    queuesRef
  }) => M.map_(M.tap_(M.let_(M.bind_(M.bind_(M.do, "queuesLock", () => T.toManaged(SM.makeSemaphore(1))), "newQueue", () => T.toManaged(R.makeRef(T.map_(T.tap_(T.bind_(T.bind_(T.do, "queue", () => Q.makeBounded(maximumLag)), "id", () => T.succeedWith(() => Symbol())), ({
    id,
    queue
  }) => R.update_(queuesRef, Map.insert(id, queue))), ({
    id,
    queue
  }) => Tp.tuple(id, queue))))), "finalize", ({
    newQueue,
    queuesLock
  }) => endTake => SM.withPermit_(T.asUnit(T.tap_(T.tap_(T.bind_(T.tap_(T.do, () => newQueue.set(T.map_(T.tap_(T.bind_(T.tap_(T.bind_(T.do, "queue", () => Q.makeBounded(1)), ({
    queue
  }) => Q.offer_(queue, endTake)), "id", () => T.succeedWith(() => Symbol())), ({
    id,
    queue
  }) => R.update_(queuesRef, Map.insert(id, queue))), ({
    id,
    queue
  }) => Tp.tuple(id, queue)))), "queues", () => T.map_(queuesRef.get, m => m.values())), ({
    queues
  }) => T.forEach_(queues, queue => T.catchSomeCause_(Q.offer_(queue, endTake), c => C.interrupted(c) ? O.some(T.unit) : O.none))), () => done(endTake))), queuesLock)), ({
    finalize
  }) => M.fork(M.foldCauseM_(forEach.forEachManaged(o => offer(o, queuesRef, decide))(self), cause => T.toManaged(finalize(Ex.halt(C.map(O.some)(cause)))), () => T.toManaged(finalize(Ex.fail(O.none)))))), ({
    newQueue,
    queuesLock
  }) => SM.withPermit_(T.flatten(newQueue.get), queuesLock))), ({
    add
  }) => add);
}
//# sourceMappingURL=distributedWithDynamic.mjs.map