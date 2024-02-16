import * as Clock from "../../Clock/index.js";
import * as HashMap from "../../Collections/Immutable/HashMap/index.js";
import * as List from "../../Collections/Immutable/List/index.js";
import * as SortedSet from "../../Collections/Immutable/SortedSet/index.js";
import * as Tuple from "../../Collections/Immutable/Tuple/index.js";
import * as T from "../../Effect/index.js";
import * as Fiber from "../../Fiber/index.js";
import type { Has } from "../../Has/index.js";
import * as L from "../../Layer/index.js";
import * as Promise from "../../Promise/index.js";
import * as Ref from "../../Ref/index.js";
import * as RefM from "../../RefM/index.js";
import { Annotations } from "../Annotations/index.js";
import { Live } from "../Live/index.js";
import type { Restorable } from "../Restorable/index.js";
export interface DurationBrand {
    readonly DurationBrand: unique symbol;
}
export declare type Duration = number & DurationBrand;
export declare function Duration(n: number): Duration;
/**
 * `TestClock` makes it easy to deterministically and efficiently test
 * effects involving the passage of time.
 *
 * Instead of waiting for actual time to pass, `sleep` and methods
 * implemented in terms of it schedule effects to take place at a given clock
 * time. Users can adjust the clock time using the `adjust` and `setTime`
 * methods, and all effects scheduled to take place on or before that time
 * will automatically be run in order.
 *
 * For example, here is how we can test `ZIO#timeout` using `TestClock:
 *
 * {{{
 *  import zio.ZIO
 *  import zio.duration._
 *  import zio.test.environment.TestClock
 *
 *  for {
 *    fiber  <- ZIO.sleep(5.minutes).timeout(1.minute).fork
 *    _      <- TestClock.adjust(1.minute)
 *    result <- fiber.join
 *  } yield result == None
 * }}}
 *
 * Note how we forked the fiber that `sleep` was invoked on. Calls to `sleep`
 * and methods derived from it will semantically block until the time is set
 * to on or after the time they are scheduled to run. If we didn't fork the
 * fiber on which we called sleep we would never get to set the time on the
 * line below. Thus, a useful pattern when using `TestClock` is to fork the
 * effect being tested, then adjust the clock time, and finally verify that
 * the expected effects have been performed.
 *
 * For example, here is how we can test an effect that recurs with a fixed
 * delay:
 *
 * {{{
 *  import zio.Queue
 *  import zio.duration._
 *  import zio.test.environment.TestClock
 *
 *  for {
 *    q <- Queue.unbounded[Unit]
 *    _ <- q.offer(()).delay(60.minutes).forever.fork
 *    a <- q.poll.map(_.isEmpty)
 *    _ <- TestClock.adjust(60.minutes)
 *    b <- q.take.as(true)
 *    c <- q.poll.map(_.isEmpty)
 *    _ <- TestClock.adjust(60.minutes)
 *    d <- q.take.as(true)
 *    e <- q.poll.map(_.isEmpty)
 *  } yield a && b && c && d && e
 * }}}
 *
 * Here we verify that no effect is performed before the recurrence period,
 * that an effect is performed after the recurrence period, and that the
 * effect is performed exactly once. The key thing to note here is that after
 * each recurrence the next recurrence is scheduled to occur at the
 * appropriate time in the future, so when we adjust the clock by 60 minutes
 * exactly one value is placed in the queue, and when we adjust the clock by
 * another 60 minutes exactly one more value is placed in the queue.
 */
export interface TestClock extends Restorable {
    readonly serviceId: Clock.ClockId;
    readonly adjust: (duration: number) => T.UIO<void>;
    readonly setTime: (duration: number) => T.UIO<void>;
    readonly sleeps: T.UIO<List.List<Duration>>;
}
export declare const TestClock: import("../../Has/index.js").Tag<TestClock>;
declare const Data_base: import("../../Case/index.js").CaseConstructorTagged<"Data", "_tag">;
/**
 * `Data` represents the state of the `TestClock`, including the clock time
 */
export declare class Data extends Data_base<{
    readonly duration: Duration;
    readonly sleeps: List.List<Tuple.Tuple<[Duration, Promise.Promise<never, void>]>>;
}> {
}
/**
 * `WarningData` describes the state of the warning message that is
 * displayed if a test is using time by is not advancing the `TestClock`.
 * The possible states are `Start` if a test has not used time, `Pending`
 * if a test has used time but has not adjusted the `TestClock`, and `Done`
 * if a test has adjusted the `TestClock` or the warning message has
 * already been displayed.
 */
export declare type WarningData = Start | Done | Pending;
declare const Start_base: import("../../Case/index.js").CaseConstructorADT<WarningData, "Start", "_tag">;
export declare class Start extends Start_base<{}> {
}
declare const Done_base: import("../../Case/index.js").CaseConstructorADT<WarningData, "Done", "_tag">;
export declare class Done extends Done_base<{}> {
}
declare const Pending_base: import("../../Case/index.js").CaseConstructorADT<WarningData, "Pending", "_tag">;
export declare class Pending extends Pending_base<{
    readonly fiber: Fiber.Fiber<never, void>;
}> {
}
export declare class Test implements TestClock {
    readonly clockState: Ref.Ref<Data>;
    readonly live: Live;
    readonly annotations: Annotations;
    readonly warningState: RefM.RefM<WarningData>;
    readonly serviceId: Clock.ClockId;
    constructor(clockState: Ref.Ref<Data>, live: Live, annotations: Annotations, warningState: RefM.RefM<WarningData>);
    /**
     * Increments the current clock time by the specified duration. Any
     * effects that were scheduled to occur on or before the new time will be
     * run in order.
     */
    readonly adjust: (duration: number) => T.UIO<void>;
    /**
     * Returns the current clock time.
     */
    readonly currentTime: T.UIO<Duration>;
    /**
     * Saves the `TestClock`'s current state in an effect which, when run,
     * will restore the `TestClock` state to the saved state
     */
    readonly save: T.UIO<T.UIO<void>>;
    /**
     * Sets the current clock time to the specified time in terms of duration
     * since the epoch. Any effects that were scheduled to occur on or before
     * the new time will immediately be run in order.
     */
    readonly setTime: (duration: number) => T.UIO<void>;
    /**
     * Semantically blocks the current fiber until the clock time is equal
     * to or greater than the specified duration. Once the clock time is
     * adjusted to on or after the duration, the fiber will automatically be
     * resumed.
     */
    readonly sleep: (duration: Duration) => T.UIO<void>;
    /**
     * Returns a list of the times at which all queued effects are scheduled
     * to resume.
     */
    readonly sleeps: T.UIO<List.List<Duration>>;
    /**
     * The warning message that will be displayed if a test is using time but
     * is not advancing the `TestClock`.
     */
    private warning;
    /**
     * Forks a fiber that will display a warning message if a test is using
     * time but is not advancing the `TestClock`.
     */
    private warningStart;
    /**
     * Cancels the warning message that is displayed if a test is using time
     * but is not advancing the `TestClock`.
     */
    readonly warningDone: T.UIO<void>;
    /**
     * Returns a set of all fibers in this test.
     */
    readonly supervisedFibers: T.UIO<SortedSet.SortedSet<Fiber.Runtime<unknown, unknown>>>;
    /**
     * Captures a "snapshot" of the identifier and status of all fibers in
     * this test other than the current fiber. Fails with the `Unit` value if
     * any of these fibers are not done or suspended. Note that because we
     * cannot synchronize on the status of multiple fibers at the same time
     * this snapshot may not be fully consistent.
     */
    readonly freeze: T.IO<void, HashMap.HashMap<Fiber.FiberID, Fiber.Status>>;
    /**
     * Delays for a short period of time.
     */
    readonly delay: T.Effect<unknown, never, void>;
    /**
     * Returns whether all descendants of this fiber are done or suspended.
     */
    readonly suspended: T.IO<void, HashMap.HashMap<Fiber.FiberID, Fiber.Status>>;
    /**
     * Polls until all descendants of this fiber are done or suspended.
     */
    readonly awaitSuspended: T.UIO<void>;
    /**
     * Runs all effects scheduled to occur on or before the specified
     * duration, which may depend on the current time, in order.
     */
    private run;
}
export declare function live(data: Data): L.Layer<Has<Live> & Has<Annotations>, never, Has<Clock.Clock> & Has<TestClock>>;
export declare const defaultTestClock: L.Layer<Has<Live> & Has<Annotations>, never, Has<Clock.Clock> & Has<TestClock>>;
export {};
//# sourceMappingURL=index.d.ts.map