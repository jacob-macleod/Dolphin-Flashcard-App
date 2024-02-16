import { Stream } from "./definitions.js";
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
export declare function provideSome_<R0, R, E, A>(self: Stream<R, E, A>, f: (r0: R0) => R): Stream<R0, E, A>;
/**
 * Provides some of the environment required to run this effect,
 * leaving the remainder `R0`.
 */
export declare function provideSome<R0, R>(f: (r0: R0) => R): <E, A>(self: Stream<R, E, A>) => Stream<R0, E, A>;
//# sourceMappingURL=provideSome.d.ts.map