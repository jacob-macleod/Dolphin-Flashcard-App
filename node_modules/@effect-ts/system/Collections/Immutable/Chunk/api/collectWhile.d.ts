import * as O from "../../../../Option/index.js";
import * as Chunk from "../core.js";
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 */
export declare function collectWhile_<A, B>(self: Chunk.Chunk<A>, f: (a: A) => O.Option<B>): Chunk.Chunk<B>;
/**
 * Transforms all elements of the chunk for as long as the specified partial function is defined.
 *
 * @ets_data_first collectWhile_
 */
export declare function collectWhile<A, B>(f: (a: A) => O.Option<B>): (self: Chunk.Chunk<A>) => Chunk.Chunk<B>;
//# sourceMappingURL=collectWhile.d.ts.map