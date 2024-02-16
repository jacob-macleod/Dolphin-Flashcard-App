import type { Either } from "@effect-ts/system/Either";
import type { ArrayURI } from "../../../Modules/index.js";
import type { URI } from "../../../Prelude/index.js";
import * as P from "../../../Prelude/index.js";
export declare const Any: P.Any<[URI<"Array", {}>], P.Auto>;
export declare const AssociativeBothZip: P.AssociativeBoth<[URI<"Array", {}>], P.Auto>;
export declare const AssociativeFlatten: P.AssociativeFlatten<[URI<"Array", {}>], P.Auto>;
export declare const Covariant: P.Covariant<[URI<"Array", {}>], P.Auto>;
export declare const ApplyZip: P.Apply<[URI<"Array", {}>], P.Auto>;
export declare const Monad: P.Monad<[URI<"Array", {}>], P.Auto>;
export declare const Applicative: P.Applicative<[URI<"Array", {}>], P.Auto>;
export declare const ForEach: P.ForEach<[URI<"Array", {}>], P.Auto>;
export declare const ForEachWithIndex: P.ForEachWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Wiltable: P.Wiltable<[URI<"Array", {}>], P.Auto>;
export declare const WiltableWithIndex: P.WiltableWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Witherable: P.Witherable<[URI<"Array", {}>], P.Auto>;
export declare const WitherableWithIndex: P.WitherableWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Compact: P.Compact<[URI<"Array", {}>], P.Auto>;
export declare const Separate: P.Separate<[URI<"Array", {}>], P.Auto>;
export declare const Extend: P.Extend<[URI<"Array", {}>], P.Auto>;
export declare const Reduce: P.Reduce<[URI<"Array", {}>], P.Auto>;
export declare const ReduceWithIndex: P.ReduceWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const ReduceRightWithIndex: P.ReduceRightWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const ReduceRight: P.ReduceRight<[URI<"Array", {}>], P.Auto>;
export declare const FoldMap: P.FoldMap<[URI<"Array", {}>], P.Auto>;
export declare const FoldMapWithIndex: P.FoldMapWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Foldable: P.Foldable<[URI<"Array", {}>], P.Auto>;
export declare const FoldableWithIndex: P.FoldableWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Filter: P.Filter<[URI<"Array", {}>], P.Auto>;
export declare const FilterWithIndex: P.FilterWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const FilterMap: P.FilterMap<[URI<"Array", {}>], P.Auto>;
export declare const FilterMapWithIndex: P.FilterMapWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Partition: P.Partition<[URI<"Array", {}>], P.Auto>;
export declare const PartitionWithIndex: P.PartitionWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const PartitionMap: P.PartitionMap<[URI<"Array", {}>], P.Auto>;
export declare const PartitionMapWithIndex: P.PartitionMapWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const Filterable: P.Filterable<[URI<"Array", {}>], P.Auto>;
export declare const FilterableWithIndex: P.FilterableWithIndex<[URI<"Array", {}>], P.Auto>;
export declare const depthFirstChainRec: P.ChainRec<[URI<ArrayURI>]>["chainRec"];
export declare function breadthFirstChainRec<A, B>(f: (a: A) => ReadonlyArray<Either<A, B>>): (a: A) => ReadonlyArray<B>;
/**
 * Exposing depth first recursion
 */
export declare const DepthFirstChainRec: P.ChainRec<[URI<"Array", {}>], P.Auto>;
/**
 * Exposing breadth first recursion
 */
export declare const BreadthFirstChainRec: P.ChainRec<[URI<"Array", {}>], P.Auto>;
//# sourceMappingURL=instances.d.ts.map