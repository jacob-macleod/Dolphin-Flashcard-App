import type { Effect } from "./effect.js";
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 */
export declare function timedWith_<R, E, A, R2, E2>(self: Effect<R, E, A>, msTime: Effect<R2, E2, number>, __trace?: string): Effect<R & R2, E | E2, import("../Collections/Immutable/Tuple/index.js").Tuple<[number, A]>>;
/**
 * A more powerful variation of `timed` that allows specifying the clock.
 *
 * @ets_data_first timedWith_
 */
export declare function timedWith<R2, E2>(msTime: Effect<R2, E2, number>, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R & R2, E2 | E, import("../Collections/Immutable/Tuple/index.js").Tuple<[number, A]>>;
/**
 * Returns a new effect that executes this one and times the execution.
 */
export declare function timed<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R & import("../Has/index.js").Has<import("../Clock/index.js").Clock>, E, import("../Collections/Immutable/Tuple/index.js").Tuple<[number, A]>>;
//# sourceMappingURL=timed.d.ts.map