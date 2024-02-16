// ets_tracing: off
import { Tagged, TaggedADT } from "../../Case/index.mjs";
import * as ClockId from "../../Clock/id.mjs";
import * as Clock from "../../Clock/index.mjs";
import * as Chunk from "../../Collections/Immutable/Chunk/index.mjs";
import * as HashMap from "../../Collections/Immutable/HashMap/index.mjs";
import * as List from "../../Collections/Immutable/List/index.mjs";
import * as SortedSet from "../../Collections/Immutable/SortedSet/index.mjs";
import * as Tuple from "../../Collections/Immutable/Tuple/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as Fiber from "../../Fiber/index.mjs";
import { identity, pipe } from "../../Function/index.mjs";
import { tag } from "../../Has/index.mjs";
import * as L from "../../Layer/index.mjs";
import * as M from "../../Managed/index.mjs";
import * as O from "../../Option/index.mjs";
import * as Ord from "../../Ord/index.mjs";
import * as Promise from "../../Promise/index.mjs";
import * as Ref from "../../Ref/index.mjs";
import * as RefM from "../../RefM/index.mjs";
import * as St from "../../Structural/index.mjs";
import { Annotations } from "../Annotations/index.mjs";
import { fiberSet } from "../FiberSet/index.mjs";
import { Live } from "../Live/index.mjs";
import { fibers } from "../TestAnnotation/index.mjs";
export function Duration(n) {
  return n;
}
export const TestClock = /*#__PURE__*/tag(Clock.ClockId);
/**
 * `Data` represents the state of the `TestClock`, including the clock time
 */

export class Data extends Tagged("Data") {}
export class Start extends TaggedADT()("Start") {}
export class Done extends TaggedADT()("Done") {}
export class Pending extends TaggedADT()("Pending") {}
export class Test {
  constructor(clockState, live, annotations, warningState) {
    this.clockState = clockState;
    this.live = live;
    this.annotations = annotations;
    this.warningState = warningState;
    this.serviceId = ClockId.ClockId;
    /**
     * Increments the current clock time by the specified duration. Any
     * effects that were scheduled to occur on or before the new time will be
     * run in order.
     */

    this.adjust = duration => {
      return T.zipRight_(this.warningDone, this.run(_ => Duration(_ + duration)));
    };
    /**
     * Returns the current clock time.
     */


    this.currentTime = T.map_(Ref.get(this.clockState), d => d.duration);
    /**
     * Saves the `TestClock`'s current state in an effect which, when run,
     * will restore the `TestClock` state to the saved state
     */

    this.save = T.map_(T.bind_(T.do, "clockData", () => Ref.get(this.clockState)), ({
      clockData
    }) => Ref.set_(this.clockState, clockData));
    /**
     * Sets the current clock time to the specified time in terms of duration
     * since the epoch. Any effects that were scheduled to occur on or before
     * the new time will immediately be run in order.
     */

    this.setTime = dateTime => T.zipRight_(this.warningDone, this.run(() => Duration(dateTime)));
    /**
     * Semantically blocks the current fiber until the clock time is equal
     * to or greater than the specified duration. Once the clock time is
     * adjusted to on or after the duration, the fiber will automatically be
     * resumed.
     */


    this.sleep = duration => T.map_(T.tap_(T.bind_(T.bind_(T.do, "promise", () => Promise.make()), "shouldAwait", ({
      promise
    }) => Ref.modify_(this.clockState, data => {
      const end = Duration(data.duration + duration);

      if (end > data.duration) {
        return Tuple.tuple(true, data.copy({
          sleeps: List.prepend(Tuple.tuple(end, promise))(data.sleeps)
        }));
      } else {
        return Tuple.tuple(false, data);
      }
    })), ({
      promise,
      shouldAwait
    }) => shouldAwait ? T.zipRight_(this.warningStart, Promise.await(promise)) : Promise.succeed_(promise, void 0)), () => void 0);
    /**
     * Returns a list of the times at which all queued effects are scheduled
     * to resume.
     */


    this.sleeps = T.map_(Ref.get(this.clockState), d => List.map(_ => _.get(0))(d.sleeps));
    /**
     * The warning message that will be displayed if a test is using time but
     * is not advancing the `TestClock`.
     */

    this.warning = "Warning: A test is using time, but is not advancing the test clock, " + "which may result in the test hanging. Use TestClock.adjust to " + "manually advance the time.";
    /**
     * Forks a fiber that will display a warning message if a test is using
     * time but is not advancing the `TestClock`.
     */

    this.warningStart = RefM.updateSome(_ => {
      switch (_._tag) {
        case "Start":
          {
            return O.some(T.map_(T.bind_(T.do, "fiber", () => this.live.provide(T.fork(T.interruptible(T.delay_(T.succeedWith(() => {
              console.log(this.warning);
            }), 5000))))), ({
              fiber
            }) => Pending.make({
              fiber
            })));
          }

        default:
          return O.none;
      }
    })(this.warningState);
    /**
     * Cancels the warning message that is displayed if a test is using time
     * but is not advancing the `TestClock`.
     */

    this.warningDone = RefM.updateSome(_ => {
      switch (_._tag) {
        case "Start":
          {
            return O.some(T.succeed(Done.make()));
          }

        case "Pending":
          {
            return O.some(T.as_(Fiber.interrupt(_.fiber), Done.make()));
          }

        default:
          return O.none;
      }
    })(this.warningState);
    /**
     * Returns a set of all fibers in this test.
     */

    this.supervisedFibers = T.descriptorWith(d => T.chain_(this.annotations.get(fibers), fa => {
      switch (fa._tag) {
        case "Left":
          {
            return T.succeed(fiberSet);
          }

        case "Right":
          {
            return T.map_(T.map_(T.forEach_(fa.right, ref => T.succeedWith(() => ref.get)), Chunk.reduce(fiberSet, SortedSet.union_)), SortedSet.filter(_ => !St.equals(_.id, d.id)));
          }
      }
    }));
    /**
     * Captures a "snapshot" of the identifier and status of all fibers in
     * this test other than the current fiber. Fails with the `Unit` value if
     * any of these fibers are not done or suspended. Note that because we
     * cannot synchronize on the status of multiple fibers at the same time
     * this snapshot may not be fully consistent.
     */

    this.freeze = T.chain_(this.supervisedFibers, T.reduce(HashMap.make(), (map, fiber) => T.chain_(fiber.status, status => {
      switch (status._tag) {
        case "Done":
          {
            return T.succeed(HashMap.set_(map, fiber.id, status));
          }

        case "Suspended":
          {
            return T.succeed(HashMap.set_(map, fiber.id, status));
          }

        default:
          return T.fail(void 0);
      }
    })));
    /**
     * Delays for a short period of time.
     */

    this.delay = this.live.provide(T.sleep(5));
    /**
     * Returns whether all descendants of this fiber are done or suspended.
     */

    this.suspended = T.chain_(T.zip_(this.freeze, T.zipRight_(this.delay, this.freeze)), ({
      tuple: [first, last]
    }) => St.equals(first, last) ? T.succeed(first) : T.fail(void 0));
    /**
     * Polls until all descendants of this fiber are done or suspended.
     */

    this.awaitSuspended = T.asUnit(T.eventually(T.filterOrFail_(T.zipWith_(this.suspended, T.zipRight_(this.live.provide(T.sleep(10)), this.suspended), St.equals), identity, () => void 0)));
    /**
     * Runs all effects scheduled to occur on or before the specified
     * duration, which may depend on the current time, in order.
     */

    this.run = f => T.zipRight_(this.awaitSuspended, T.chain_(Ref.modify_(this.clockState, data => {
      const end = f(data.duration);
      const sorted = List.sortWith_(data.sleeps, Ord.contramap_(Ord.number, _ => _.get(0)));

      if (!List.isEmpty(sorted)) {
        const {
          tuple: [duration, promise]
        } = List.unsafeFirst(sorted);
        const sleeps = List.tail(sorted);

        if (duration <= end) {
          return Tuple.tuple(O.some(Tuple.tuple(end, promise)), new Data({
            duration,
            sleeps
          }));
        }
      }

      return Tuple.tuple(O.none, new Data({
        duration: end,
        sleeps: data.sleeps
      }));
    }), o => {
      switch (o._tag) {
        case "None":
          {
            return T.unit;
          }

        case "Some":
          {
            return T.zipRight_(T.zipRight_(Promise.succeed_(o.value.get(1), void 0), T.yieldNow), this.run(() => o.value.get(0)));
          }
      }
    }));
  }

}
export function live(data) {
  return L.fromRawManaged(M.gen(function* (_) {
    const live = yield* _(Live);
    const annotations = yield* _(Annotations);
    const ref = yield* _(Ref.makeRef(data));
    const refM = yield* _(RefM.makeRefM(Start.make()));
    const test = yield* _(M.make_(T.succeedWith(() => new Test(ref, live, annotations, refM)), _ => _.warningDone));
    const testClock = TestClock.has(test);
    return testClock;
  }));
}
export const defaultTestClock = /*#__PURE__*/live( /*#__PURE__*/new Data({
  duration: /*#__PURE__*/Duration(0),
  sleeps: /*#__PURE__*/List.empty()
}));
//# sourceMappingURL=index.mjs.map