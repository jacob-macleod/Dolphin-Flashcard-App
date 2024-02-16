import * as Tp from "../../Tuple/index.js";
import type { Chunk } from "../definition.js";
/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 */
export declare function zipWithIndexOffset_<A>(self: Chunk<A>, offset: number): Chunk<Tp.Tuple<[A, number]>>;
/**
 * Zips this chunk with the index of every element, starting from the initial
 * index value.
 *
 * @ets_data_first zipWithIndexOffset_
 */
export declare function zipWithIndexOffset(offset: number): <A>(self: Chunk<A>) => Chunk<Tp.Tuple<[A, number]>>;
//# sourceMappingURL=zipWithIndexOffset.d.ts.map