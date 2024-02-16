/**
 * Ported from https://github.com/zio/zio/blob/master/core/shared/src/main/scala/zio/Clock.scala
 *
 * Copyright 2020 Michael Arnaldi and the Matechs Garage Contributors.
 */
import "../Operator/index.js";
import type { Effect, UIO } from "../Effect/effect.js";
import type { Has, Tag } from "../Has/index.js";
import { ClockId } from "./id.js";
export { ClockId };
export declare abstract class Clock {
    readonly serviceId: ClockId;
    abstract readonly currentTime: UIO<number>;
    abstract readonly sleep: (ms: number, __trace?: string) => UIO<void>;
}
export declare const HasClock: Tag<Clock>;
export declare type HasClock = Has<Clock>;
export declare class LiveClock extends Clock {
    currentTime: UIO<number>;
    sleep: (ms: number, __trace?: string) => UIO<void>;
}
export declare class ProxyClock extends Clock {
    readonly currentTime: UIO<number>;
    readonly sleep: (ms: number, __trace?: string) => UIO<void>;
    constructor(currentTime: UIO<number>, sleep: (ms: number, __trace?: string) => UIO<void>);
}
/**
 * Get the current time in ms since epoch
 */
export declare const currentTime: Effect<Has<Clock>, never, number>;
/**
 * Sleeps for the provided amount of ms
 */
export declare function sleep(ms: number, __trace?: string): Effect<Has<Clock>, never, void>;
/**
 * Access clock from environment
 */
export declare const withClockM: <R, E, B>(f: (a: Clock) => Effect<R, E, B>, __trace?: string | undefined) => Effect<R & Has<Clock>, E, B>;
/**
 * Access clock from environment
 */
export declare const withClock: <B>(f: (a: Clock) => B, __trace?: string | undefined) => Effect<Has<Clock>, never, B>;
export declare class TestClock extends Clock {
    private time;
    readonly currentTime: UIO<number>;
    readonly sleep: (ms: number) => UIO<void>;
    readonly advance: (ms: number) => UIO<void>;
    static advance: (ms: number) => Effect<Has<TestClock>, never, void>;
}
/**
 * Accesses the TestClock
 */
export declare const HasTestClock: Tag<TestClock>;
export declare const provideTestClock: <R1, E1, A1>(ma: Effect<R1 & Has<TestClock> & Has<Clock>, E1, A1>) => Effect<R1, E1, A1>;
//# sourceMappingURL=index.d.ts.map