import type { Effect } from "./effect.js";
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 */
export declare function map_<R, E, A, B>(_: Effect<R, E, A>, f: (a: A) => B, __trace?: string): Effect<R, E, B>;
/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (a: A) => B, __trace?: string): <R, E>(self: Effect<R, E, A>) => Effect<R, E, B>;
//# sourceMappingURL=map.d.ts.map