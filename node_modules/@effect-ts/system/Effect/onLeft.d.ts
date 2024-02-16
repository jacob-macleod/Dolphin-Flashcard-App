import type { Effect } from "./effect.js";
/**
 * Returns this effect if environment is on the left, otherwise returns
 * whatever is on the right unmodified. Note that the result is lifted
 * in either.
 */
export declare function onLeft<C>(__trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<import("../Either/core.js").Either<R, C>, E, import("../Either/core.js").Either<A, C>>;
//# sourceMappingURL=onLeft.d.ts.map