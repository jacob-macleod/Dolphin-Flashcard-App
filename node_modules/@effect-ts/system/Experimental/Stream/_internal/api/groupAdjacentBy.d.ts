import * as CK from "../../../../Collections/Immutable/Chunk/index.js";
import * as Tp from "../../../../Collections/Immutable/Tuple/index.js";
import * as C from "../core.js";
/**
 * Creates a stream that groups on adjacent keys, calculated by function f.
 */
export declare function groupAdjacentBy_<R, E, A, K>(self: C.Stream<R, E, A>, f: (a: A) => K): C.Stream<R, E, Tp.Tuple<[K, CK.Chunk<A>]>>;
/**
 * Creates a stream that groups on adjacent keys, calculated by function f.
 *
 * @ets_data_first groupAdjacentBy_
 */
export declare function groupAdjacentBy<A, K>(f: (a: A) => K): <R, E>(self: C.Stream<R, E, A>) => C.Stream<R, E, Tp.Tuple<[K, CK.Chunk<A>]>>;
//# sourceMappingURL=groupAdjacentBy.d.ts.map