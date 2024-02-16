import type { Stream } from "./definitions.js";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0` and combining it automatically using spread.
 */
export declare function provide<R>(r: R): <E, A, R0>(next: Stream<R & R0, E, A>) => Stream<R0, E, A>;
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll<R>(r: R): <E, A>(self: Stream<R, E, A>) => Stream<unknown, E, A>;
/**
 * Provides the stream with its required environment, which eliminates
 * its dependency on `R`.
 */
export declare function provideAll_<E, A, R = unknown>(self: Stream<R, E, A>, r: R): Stream<unknown, E, A>;
//# sourceMappingURL=provide.d.ts.map