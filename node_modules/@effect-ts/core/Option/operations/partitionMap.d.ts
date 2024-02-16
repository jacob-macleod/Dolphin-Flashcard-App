import * as O from "@effect-ts/system/Option";
import type * as Tp from "../../Collections/Immutable/Tuple/index.js";
import type { Either } from "../../Either/index.js";
/**
 * Partition + Map
 *
 * @ets_data_first partitionMap_
 */
export declare function partitionMap<A, B, B1>(f: (a: A) => Either<B, B1>): (fa: O.Option<A>) => Tp.Tuple<[O.Option<B>, O.Option<B1>]>;
/**
 * Partition + Map
 */
export declare function partitionMap_<A, B, B1>(fa: O.Option<A>, f: (a: A) => Either<B, B1>): Tp.Tuple<[O.Option<B>, O.Option<B1>]>;
//# sourceMappingURL=partitionMap.d.ts.map