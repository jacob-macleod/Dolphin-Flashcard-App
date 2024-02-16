import * as A from "../../Collections/Immutable/Chunk/index.mjs";
import * as E from "../../Either/index.mjs";
import * as Ex from "../../Exit/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as SC from "../../Schedule/index.mjs";
import * as T from "../_internal/effect.mjs";
import * as F from "../_internal/fiber.mjs";
import * as M from "../_internal/managed.mjs";
import * as R from "../_internal/ref.mjs";
import * as Handoff from "../Handoff/index.mjs";
import * as Take from "../Take/index.mjs";
import { Stream } from "./definitions.mjs";
import { flattenTake } from "./flattenTake.mjs";
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

export function aggregateAsyncWithinEither(transducer, schedule) {
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

export function aggregateAsyncWithinEither_(self, transducer, schedule) {
  return flattenTake((m => new Stream(m))(M.map_(M.tap_(M.let_(M.let_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.bind_(M.do, "pull", () => self.proc), "push", () => transducer.push), "handoff", () => M.fromEffect(Handoff.make())), "raceNextTime", () => R.makeManagedRef(false)), "waitingFiber", () => R.makeManagedRef(O.none)), "sdriver", () => M.fromEffect(SC.driver(schedule))), "lastChunk", () => R.makeManagedRef(A.empty())), "producer", ({
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
//# sourceMappingURL=aggregateAsyncWithinEither.mjs.map