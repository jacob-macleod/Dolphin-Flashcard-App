import type { Either } from "../../../Either/index.js";
import type { URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
import * as Chunk from "./operations.js";
export declare const Collection: P.Collection<[URI<"Chunk", {}>], P.Auto>;
export declare const Any: P.Any<[URI<"Chunk", {}>], P.Auto>;
export declare const AssociativeBothZip: P.AssociativeBoth<[URI<"Chunk", {}>], P.Auto>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"Chunk", {}>], P.Auto>;
export declare const Covariant: P.Covariant<[URI<"Chunk", {}>], P.Auto>;
export declare const ApplyZip: P.Apply<[URI<"Chunk", {}>], P.Auto>;
export declare const Monad: P.Monad<[URI<"Chunk", {}>], P.Auto>;
export declare const Applicative: P.Applicative<[URI<"Chunk", {}>], P.Auto>;
export declare const ForEach: P.ForEach<[URI<"Chunk", {}>], P.Auto>;
export declare const ForEachWithIndex: P.ForEachWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Wiltable: P.Wiltable<[URI<"Chunk", {}>], P.Auto>;
export declare const WiltableWithIndex: P.WiltableWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Witherable: P.Witherable<[URI<"Chunk", {}>], P.Auto>;
export declare const WitherableWithIndex: P.WitherableWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Compact: P.Compact<[URI<"Chunk", {}>], P.Auto>;
export declare const Separate: P.Separate<[URI<"Chunk", {}>], P.Auto>;
export declare const Extend: P.Extend<[URI<"Chunk", {}>], P.Auto>;
export declare const Reduce: P.Reduce<[URI<"Chunk", {}>], P.Auto>;
export declare const ReduceWithIndex: P.ReduceWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const ReduceRightWithIndex: P.ReduceRightWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const ReduceRight: P.ReduceRight<[URI<"Chunk", {}>], P.Auto>;
export declare const FoldMap: P.FoldMap<[URI<"Chunk", {}>], P.Auto>;
export declare const FoldMapWithIndex: P.FoldMapWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Foldable: P.Foldable<[URI<"Chunk", {}>], P.Auto>;
export declare const FoldableWithIndex: P.FoldableWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Filter: P.Filter<[URI<"Chunk", {}>], P.Auto>;
export declare const FilterWithIndex: P.FilterWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const FilterMap: P.FilterMap<[URI<"Chunk", {}>], P.Auto>;
export declare const FilterMapWithIndex: P.FilterMapWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Partition: P.Partition<[URI<"Chunk", {}>], P.Auto>;
export declare const PartitionWithIndex: P.PartitionWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const PartitionMap: P.PartitionMap<[URI<"Chunk", {}>], P.Auto>;
export declare const PartitionMapWithIndex: P.PartitionMapWithIndex<[URI<"Chunk", {}>], P.Auto>;
export declare const Filterable: P.Filterable<[URI<"Chunk", {}>], P.Auto>;
export declare const FilterableWithIndex: P.FilterableWithIndex<[URI<"Chunk", {}>], P.Auto>;
/**
 * Exposing depth first recursion
 */
export declare const DepthFirstChainRec: P.ChainRec<[URI<"Chunk", {}>], P.Auto>;
export declare const depthFirstChainRec: <A, B, K, Q, W, X, I, S, R, E>(f: (a: A) => Chunk.Chunk<Either<A, B>>) => (a: A) => Chunk.Chunk<B>;
/**
 * Exposing breadth first recursion
 */
export declare const BreadthFirstChainRec: P.ChainRec<[URI<"Chunk", {}>], P.Auto>;
export declare const breadthFirstChainRec: <A, B, K, Q, W, X, I, S, R, E>(f: (a: A) => Chunk.Chunk<Either<A, B>>) => (a: A) => Chunk.Chunk<B>;
//# sourceMappingURL=instances.d.ts.map