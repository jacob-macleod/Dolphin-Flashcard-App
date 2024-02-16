import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the right.
 */
export declare function reduceRight_<A, S>(self: Chunk.Chunk<A>, s: S, f: (a: A, s: S) => S): S;
/**
 * Folds over the elements in this chunk from the right.
 *
 * @ets_data_first reduceRight_
 */
export declare function reduceRight<A, S>(s: S, f: (a: A, s: S) => S): (self: Chunk.Chunk<A>) => S;
//# sourceMappingURL=reduceRight.d.ts.map