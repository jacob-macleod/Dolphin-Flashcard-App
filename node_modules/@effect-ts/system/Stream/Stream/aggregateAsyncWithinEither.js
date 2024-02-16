"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aggregateAsyncWithinEither = aggregateAsyncWithinEither;
exports.aggregateAsyncWithinEither_ = aggregateAsyncWithinEither_;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Chunk/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var Ex = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Exit/index.js"));

var _index4 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var SC = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Schedule/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/effect.js"));

var F = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/fiber.js"));

var M = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/managed.js"));

var R = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../_internal/ref.js"));

var Handoff = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Handoff/index.js"));

var Take = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Take/index.js"));

var _definitions = /*#__PURE__*/require("./definitions.js");

var _flattenTake = /*#__PURE__*/require("./flattenTake.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Aggregates elements using the provided transducer until it signals completion, or the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the transducer until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 */
function aggregateAsyncWithinEither(transducer, schedule) {
  return self => aggregateAsyncWithinEither_(self, transducer, schedule);
}
/**
 * Aggregates elements using the provided transducer until it signals completion, or the
 * delay signalled by the schedule has passed.
 *
 * This operator divides the stream into two asynchronous islands. Operators upstream
 * of this operator run on one fiber, while downstream operators run on another. Elements
 * will be aggregated by the transducer until the downstream fiber pulls the aggregated value,
 * or until the schedule's delay has passed.
 *
 * Aggregated elements will be fed into the schedule to determine the delays between
 * pulls.
 */


function aggregateAsyncWithinEither_(self, transducer, schedule) {
  return (0, _flattenTake.flattenTake)((m => new _definitions.Stream(m))(M.map_(M.tap_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "pull", () => self.proc), "push", () => transducer.push), "handoff", () => M.fromEffect(Handoff.make())), "raceNextTime", () => R.makeManagedRef(false)), "waitingFiber", () => R.makeManagedRef(O.none)), "sdriver", () => M.fromEffect(SC.driver(schedule))), "lastChunk", () => R.makeManagedRef(A.empty())), "producer", ({
    handoff,
    pull
  }) => T.repeatWhileM_(Take.fromPull(pull), take => T.as_(Handoff.offer_(handoff, take), Ex.succeeded(take)))), "consumer", ({
    handoff,
    lastChunk,
    push,
    raceNextTime,
    sdriver,
    waitingFiber
  }) => {
    const updateSchedule = T.fold_(T.chain_(lastChunk.get, sdriver.next), _ => O.none, O.some);
    const waitForProducer = T.chain_(R.getAndSet_(waitingFiber, O.none), O.fold(() => Handoff.take(handoff), fiber => F.join(fiber)));
    return T.onInterrupt_(T.chain_(raceNextTime.get, x => go(waitForProducer, push, lastChunk, raceNextTime, updateSchedule, sdriver, waitingFiber, x)), _ => T.chain_(waitingFiber.get, x => O.getOrElse_(O.map_(x, F.interrupt), () => T.unit)));
  }), ({
    producer
  }) => T.forkManaged(producer)), ({
    consumer
  }) => consumer)));
}

function go(waitForProducer, push, lastChunk, raceNextTime, updateSchedule, sdriver, waitingFiber, race) {
  if (!race) {
    return T.zipLeft_(T.chain_(waitForProducer, x => handleTake(push, lastChunk, x)), raceNextTime.set(true));
  } else {
    return T.raceWith_(updateSchedule, waitForProducer, (scheduleDone, producerWaiting) => T.chain_(T.done(scheduleDone), O.fold(() => T.map_(T.tap_(T.tap_(T.bind_(T.let_(T.bind_(T.do, "lastQ", () => T.zipLeft_(T.zipRight_(lastChunk.set(A.empty()), T.orDie(sdriver.last)), sdriver.reset)), "scheduleResult", ({
      lastQ
    }) => Ex.succeed(A.single(E.left(lastQ)))), "take", () => T.tap_(Take.fromPull(T.asSomeError(push(O.none))), x => updateLastChunk(lastChunk, x))), () => raceNextTime.set(false)), () => waitingFiber.set(O.some(producerWaiting))), ({
      scheduleResult,
      take
    }) => A.from([scheduleResult, Take.map_(take, E.right)])), _ => T.map_(T.tap_(T.tap_(T.bind_(T.do, "ps", () => T.tap_(Take.fromPull(T.asSomeError(push(O.none))), x => updateLastChunk(lastChunk, x))), () => raceNextTime.set(false)), () => waitingFiber.set(O.some(producerWaiting))), ({
      ps
    }) => A.from([Take.map_(ps, E.right)])))), (producerDone, scheduleWaiting) => T.zipRight_(F.interrupt(scheduleWaiting), handleTake(push, lastChunk, Ex.flatten(producerDone))));
  }
}

function handleTake(push, lastChunk, take) {
  return T.mapError_(Take.foldM(() => T.map_(push(O.none), ps => A.from([Take.chunk(A.map_(ps, E.right)), Take.end])), T.halt, os => T.chain_(Take.fromPull(T.asSomeError(push(O.some(os)))), take => T.as_(updateLastChunk(lastChunk, take), A.single(Take.map_(take, E.right)))))(take), O.some);
}

function updateLastChunk(lastChunk, take) {
  return Take.tap_(take, lastChunk.set);
}
//# sourceMappingURL=aggregateAsyncWithinEither.js.map