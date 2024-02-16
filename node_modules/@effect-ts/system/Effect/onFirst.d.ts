import type { Effect } from "./effect.js";
/**
 * Propagates the success value to the first element of a tuple, but
 * passes the effect input `R` along unmodified as the second element
 * of the tuple.
 */
export declare function onFirst<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, E, import("../Collections/Immutable/Tuple/index.js").Tuple<[A, R]>>;
//# sourceMappingURL=onFirst.d.ts.map