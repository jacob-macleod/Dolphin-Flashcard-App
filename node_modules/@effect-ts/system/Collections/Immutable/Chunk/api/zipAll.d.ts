import * as O from "../../../../Option/index.js";
import * as Tp from "../../Tuple/index.js";
import type { Chunk } from "../definition.js";
/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 */
export declare function zipAll_<A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<Tp.Tuple<[O.Option<A>, O.Option<B>]>>;
/**
 * Zips this chunk with the specified chunk to produce a new chunk with
 * pairs of elements from each chunk, filling in missing values from the
 * shorter chunk with `None`. The returned chunk will have the length of the
 * longer chunk.
 *
 * @ets_data_first zipAll_
 */
export declare function zipAll<A, B>(that: Chunk<B>): (self: Chunk<A>) => Chunk<Tp.Tuple<[O.Option<A>, O.Option<B>]>>;
//# sourceMappingURL=zipAll.d.ts.map