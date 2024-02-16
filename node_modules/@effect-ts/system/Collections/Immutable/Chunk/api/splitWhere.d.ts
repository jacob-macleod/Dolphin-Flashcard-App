import type * as Tp from "../../Tuple/index.js";
import type * as Chunk from "../core.js";
/**
 * Splits this chunk on the first element that matches this predicate.
 */
export declare function splitWhere_<A>(self: Chunk.Chunk<A>, f: (a: A) => boolean): Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
/**
 * Splits this chunk on the first element that matches this predicate.
 *
 * @ets_data_first splitWhere_
 */
export declare function splitWhere<A>(f: (a: A) => boolean): (self: Chunk.Chunk<A>) => Tp.Tuple<[Chunk.Chunk<A>, Chunk.Chunk<A>]>;
//# sourceMappingURL=splitWhere.d.ts.map