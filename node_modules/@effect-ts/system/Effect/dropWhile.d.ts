import type { Array } from "../Collections/Immutable/Array/index.js";
import type { Effect } from "./effect.js";
/**
 * Drops all elements so long as the effectful predicate returns true.
 *
 * @ets_data_first dropWhile_
 */
export declare function dropWhile<A, R, E>(p: (a: A) => Effect<R, E, boolean>, __trace?: string): (as: Iterable<A>) => Effect<R, E, Array<A>>;
/**
 * Drops all elements so long as the effectful predicate returns true.
 */
export declare function dropWhile_<A, R, E>(as: Iterable<A>, p: (a: A) => Effect<R, E, boolean>, __trace?: string): Effect<R, E, Array<A>>;
//# sourceMappingURL=dropWhile.d.ts.map