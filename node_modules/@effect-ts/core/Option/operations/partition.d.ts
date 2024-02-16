import type * as O from "@effect-ts/system/Option";
import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Predicate, Refinement } from "../../Function/index.js";
/**
 * Partition
 *
 * @ets_data_first partition_
 */
export declare function partition<A, B extends A>(refinement: Refinement<A, B>): (fa: O.Option<A>) => Tp.Tuple<[O.Option<A>, O.Option<B>]>;
/**
 * Partition
 *
 * @ets_data_first partition_
 */
export declare function partition<A>(predicate: Predicate<A>): (fa: O.Option<A>) => Tp.Tuple<[O.Option<A>, O.Option<A>]>;
/**
 * Partition
 */
export declare function partition_<A, B extends A>(fa: O.Option<A>, refinement: Refinement<A, B>): Tp.Tuple<[O.Option<A>, O.Option<B>]>;
/**
 * Partition
 */
export declare function partition_<A>(fa: O.Option<A>, predicate: Predicate<A>): Tp.Tuple<[O.Option<A>, O.Option<A>]>;
//# sourceMappingURL=partition.d.ts.map