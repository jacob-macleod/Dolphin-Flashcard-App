import * as O from "../../../../Option/index.js";
import * as Chunk from "../core.js";
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 */
export declare function collect_<A, B>(self: Chunk.Chunk<A>, f: (a: A) => O.Option<B>): Chunk.Chunk<B>;
/**
 * Returns a filtered, mapped subset of the elements of this chunk.
 *
 * @ets_data_first collect_
 */
export declare function collect<A, B>(f: (a: A) => O.Option<B>): (self: Chunk.Chunk<A>) => Chunk.Chunk<B>;
//# sourceMappingURL=collect.d.ts.map