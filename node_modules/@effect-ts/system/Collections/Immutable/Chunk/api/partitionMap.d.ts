import type * as E from "../../../../Either/index.js";
import * as Tp from "../../Tuple/index.js";
import * as Chunk from "../core.js";
/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 */
export declare function partitionMap_<A, B, C>(self: Chunk.Chunk<A>, f: (a: A) => E.Either<B, C>): Tp.Tuple<[Chunk.Chunk<B>, Chunk.Chunk<C>]>;
/**
 * Partitions the elements of this chunk into two chunks using the specified
 * function.
 *
 * @ets_data_first partitionMap_
 */
export declare function partitionMap<A, B, C>(f: (a: A) => E.Either<B, C>): (self: Chunk.Chunk<A>) => Tp.Tuple<[Chunk.Chunk<B>, Chunk.Chunk<C>]>;
//# sourceMappingURL=partitionMap.d.ts.map