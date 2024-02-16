import type { Effect } from "./effect.js";
/**
 * Propagates the success value to the second element of a tuple, but
 * passes the effect input `R` along unmodified as the first element
 * of the tuple.
 */
export declare function onSecond<R, E, A>(self: Effect<R, E, A>, __trace?: string): Effect<R, E, import("../Collections/Immutable/Tuple/index.js").Tuple<[R, A]>>;
//# sourceMappingURL=onSecond.d.ts.map