"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.distributedWithDynamic = distributedWithDynamic;
exports.distributedWithDynamic_ = distributedWithDynamic_;

var C = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Cause/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var Map = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Map/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Tuple/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index6 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var Q = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Queue/index.js"));

var SM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Semaphore/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var forEach = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("./forEach.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * More powerful version of `distributedWith`. This returns a function that will produce
 * new queues and corresponding indices.
 * You can also provide a function that will be executed after the final events are enqueued in all queues.
 * Shutdown of the queues is handled by the driver.
 * Downstream users can also shutdown queues manually. In this case the driver will
 * continue but no longer backpressure on them.
 */
function distributedWithDynamic(maximumLag, decide, done = _ => T.unit) {
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


function distributedWithDynamic_(self, maximumLag, decide, done = _ => T.unit) {
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
//# sourceMappingURL=distributedWithDynamic.js.map