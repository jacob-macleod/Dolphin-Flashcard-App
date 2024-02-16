import type * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import type { Predicate } from "../../../../Function/index.js";
import type * as M from "../../../../Managed/index.js";
import type * as C from "../core.js";
/**
 * Partition a stream using a predicate. The first stream will contain all element evaluated to true
 * and the second one will contain all element evaluated to false.
 * The faster stream may advance by up to buffer elements further than the slower one.
 */
export declare function partition_<R, E, A>(self: C.Stream<R, E, A>, p: Predicate<A>, buffer?: number): M.Managed<R, E, Tp.Tuple<[C.IO<E, A>, C.IO<E, A>]>>;
/**
 * Partition a stream using a predicate. The first stream will contain all element evaluated to true
 * and the second one will contain all element evaluated to false.
 * The faster stream may advance by up to buffer elements further than the slower one.
 *
 * @ets_data_first partition_
 */
export declare function partition<A>(p: Predicate<A>, buffer?: number): <R, E>(self: C.Stream<R, E, A>) => M.Managed<R, E, Tp.Tuple<[C.IO<E, A>, C.IO<E, A>]>>;
//# sourceMappingURL=partition.d.ts.map