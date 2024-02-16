import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type * as T from "../../../../Effect/index.js";
import * as GB from "../../GroupBy/index.js";
import type * as C from "../core.js";
/**
 * More powerful version of `Stream.groupByKey`
 */
export declare function groupBy_<R, R1, E, E1, A, K, V>(self: C.Stream<R, E, A>, f: (a: A) => T.Effect<R1, E1, Tp.Tuple<[K, V]>>, buffer?: number): GB.GroupBy<R & R1, E | E1, K, V, A>;
/**
 * More powerful version of `Stream.groupByKey`
 *
 * @ets_data_first groupBy_
 */
export declare function groupBy<R1, E1, A, K, V>(f: (a: A) => T.Effect<R1, E1, Tp.Tuple<[K, V]>>, buffer?: number): <R, E>(self: C.Stream<R, E, A>) => GB.GroupBy<R & R1, E1 | E, K, V, A>;
//# sourceMappingURL=groupBy.d.ts.map