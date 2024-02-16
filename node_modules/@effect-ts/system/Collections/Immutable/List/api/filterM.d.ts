import type { Effect } from "../../../../Effect/effect.js";
import * as List from "../core.js";
/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 */
export declare function filterM_<R, E, A>(self: List.List<A>, f: (a: A) => Effect<R, E, boolean>): Effect<R, E, List.List<A>>;
/**
 * Filters this list by the specified effectful predicate, retaining all elements for
 * which the predicate evaluates to true.
 *
 * @ets_data_first filterM_
 */
export declare function filterM<R, E, A>(f: (a: A) => Effect<R, E, boolean>): (self: List.List<A>) => Effect<R, E, List.List<A>>;
//# sourceMappingURL=filterM.d.ts.map