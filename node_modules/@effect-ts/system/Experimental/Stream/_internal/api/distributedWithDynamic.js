"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distributedWithDynamic = distributedWithDynamic;
exports.distributedWithDynamic_ = distributedWithDynamic_;

var CS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Cause/index.js"));

var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/HashMap/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/List/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Collections/Immutable/Tuple/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Effect/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Exit/index.js"));

var _index7 = /*#__PURE__*/require("../../../../Function/index.js");

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Managed/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Queue/index.js"));

var Ref = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Ref/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Semaphore/index.js"));

var AR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../../Support/AtomicNumber/index.js"));

var RunForEachManaged = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./runForEachManaged.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const distributedWithDynamicId = /*#__PURE__*/new AR.AtomicNumber(0);
/**
 * More powerful version of `Stream#distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */

function distributedWithDynamic_(self, maximumLag, decide, done) {
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


function distributedWithDynamic(maximumLag, decide, done) {
  return self => distributedWithDynamic_(self, maximumLag, decide, done);
}
//# sourceMappingURL=distributedWithDynamic.js.map