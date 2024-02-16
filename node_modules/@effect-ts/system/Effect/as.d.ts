import type { Effect } from "./effect.js";
/**
 * Maps the success value of this effect to the specified constant value.
 */
export declare function as_<R, E, A, B>(self: Effect<R, E, A>, b: B, __trace?: string): Effect<R, E, B>;
/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @ets_data_first as_
 */
export declare function as<B>(b: B, __trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<R, E, B>;
//# sourceMappingURL=as.d.ts.map