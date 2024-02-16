import * as Tp from "../../Tuple/index.js";
import type { Chunk } from "../definition.js";
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 */
export declare function zip_<A, B>(self: Chunk<A>, that: Chunk<B>): Chunk<Tp.Tuple<[A, B]>>;
/**
 * Zips this chunk with the specified chunk using the specified combiner.
 *
 * @ets_data_first zip_
 */
export declare function zip<B>(that: Chunk<B>): <A>(self: Chunk<A>) => Chunk<Tp.Tuple<[A, B]>>;
//# sourceMappingURL=zip.d.ts.map