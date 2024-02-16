import * as O from "@effect-ts/system/Option";
import type { Predicate, Refinement } from "../../Function/index.js";
/**
 * Filter using refinement
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (fa: O.Option<A>) => O.Option<B>;
/**
 * Filter using predicate
 *
 * @ets_data_first filter_
 */
export declare function filter<A>(predicate: Predicate<A>): (fa: O.Option<A>) => O.Option<A>;
/**
 * Filter using refinement
 */
export declare function filter_<A, B extends A>(fa: O.Option<A>, refinement: Refinement<A, B>): O.Option<B>;
/**
 * Filter using refinement
 */
export declare function filter_<A>(fa: O.Option<A>, predicate: Predicate<A>): O.Option<A>;
//# sourceMappingURL=filter.d.ts.map