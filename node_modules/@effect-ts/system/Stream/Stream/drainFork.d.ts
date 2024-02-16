import type { Stream } from "./definitions.js";
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */
export declare function drainFork_<R, R1, E, E1, O, X>(self: Stream<R, E, O>, other: Stream<R1, E1, X>): Stream<R1 & R, E | E1, O>;
/**
 * Drains the provided stream in the background for as long as this stream is running.
 * If this stream ends before `other`, `other` will be interrupted. If `other` fails,
 * this stream will fail with that error.
 */
export declare function drainFork<R1, E1, X>(other: Stream<R1, E1, X>): <R, E, O>(self: Stream<R, E, O>) => Stream<R1 & R, E1 | E, O>;
//# sourceMappingURL=drainFork.d.ts.map