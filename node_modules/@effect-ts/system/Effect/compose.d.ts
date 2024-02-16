import type { Effect } from "./effect.js";
/**
 * Uses the output of `that` to provide to `self`
 *
 * @ets_data_first compose_
 */
export declare function compose<A, E1, B>(that: Effect<A, E1, B>, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R, E1 | E, B>;
/**
 * Uses the output of `that` to provide to `self`
 */
export declare function compose_<A, E1, B, R, E>(self: Effect<R, E, A>, that: Effect<A, E1, B>, __trace?: string): Effect<R, E1 | E, B>;
//# sourceMappingURL=compose.d.ts.map