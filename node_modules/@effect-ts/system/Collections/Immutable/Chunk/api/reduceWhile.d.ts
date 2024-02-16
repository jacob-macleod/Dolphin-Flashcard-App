import type * as Chunk from "../core.js";
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 */
export declare function reduceWhile_<A, S>(self: Chunk.Chunk<A>, s: S, pred: (s: S) => boolean, f: (s: S, a: A) => S): S;
/**
 * Folds over the elements in this chunk from the left.
 * Stops the fold early when the condition is not fulfilled.
 *
 * @ets_data_first reduceWhile_
 */
export declare function reduceWhile<A, S>(s: S, pred: (s: S) => boolean, f: (s: S, a: A) => S): (self: Chunk.Chunk<A>) => S;
//# sourceMappingURL=reduceWhile.d.ts.map