import type { Effect } from "./effect.js";
/**
 * Returns this effect if environment is on the right, otherwise returns
 * whatever is on the left unmodified. Note that the result is lifted
 * in either.
 */
export declare function onRight<C>(__trace?: string): <R, E, A>(self: Effect<R, E, A>) => Effect<import("../Either/core.js").Either<C, R>, E, import("../Either/core.js").Either<C, A>>;
//# sourceMappingURL=onRight.d.ts.map