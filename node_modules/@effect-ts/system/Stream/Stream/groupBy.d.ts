import * as Tp from "../../Collections/Immutable/Tuple/index.js";
import * as T from "../_internal/effect.js";
import * as GB from "../GroupBy/index.js";
import type { Stream } from "./definitions.js";
/**
 * More powerful version of `Stream.groupByKey`
 */
export declare function groupBy_<R, R1, E, E1, O, K, V>(self: Stream<R, E, O>, f: (o: O) => T.Effect<R1, E1, Tp.Tuple<[K, V]>>, buffer?: number): GB.GroupBy<R & R1, E | E1, K, V>;
/**
 * More powerful version of `Stream.groupByKey`
 */
export declare function groupBy<R1, E1, O, K, V>(f: (o: O) => T.Effect<R1, E1, Tp.Tuple<[K, V]>>, buffer?: number): <R, E>(self: Stream<R, E, O>) => GB.GroupBy<R & R1, E | E1, K, V>;
//# sourceMappingURL=groupBy.d.ts.map