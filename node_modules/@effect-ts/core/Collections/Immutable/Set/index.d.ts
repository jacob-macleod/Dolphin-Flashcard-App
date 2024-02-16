import "../../../Operator/index.js";
import type { Option } from "@effect-ts/system/Option";
import type { MutableSet } from "@effect-ts/system/Support/Mutable";
import type { Associative } from "../../../Associative/index.js";
import type { Either } from "../../../Either/index.js";
import type { Equal } from "../../../Equal/index.js";
import type { Predicate, Refinement } from "../../../Function/index.js";
import type { Identity } from "../../../Identity/index.js";
import type { Ord } from "../../../Ord/index.js";
import type { Show } from "../../../Show/index.js";
import * as Tp from "../Tuple/index.js";
export declare type Set<A> = ReadonlySet<A>;
export declare const empty: Set<never>;
/**
 * Get an Associative that performs Set intersection
 */
export declare function getIntersectionAssociative<A>(E: Equal<A>): Associative<Set<A>>;
/**
 * Get an Identity that performs Set union
 */
export declare function getUnionIdentity<A>(E: Equal<A>): Identity<Set<A>>;
/**
 * The set of elements which are in both the first and second set
 */
export declare function intersection_<A>(E: Equal<A>): (l: Set<A>, r: Set<A>) => Set<A>;
/**
 * The set of elements which are in both the first and second set
 */
export declare function intersection<A>(E: Equal<A>): (r: Set<A>) => (l: Set<A>) => Set<A>;
/**
 * Convert a mutable set to a readonly one
 */
export declare function fromMutable<A>(s: MutableSet<A>): Set<A>;
/**
 * Convert a set to a mutable one
 */
export declare function toMutable<A>(s: Set<A>): MutableSet<A>;
/**
 * get Show for set given Show for values
 */
export declare function getShow<A>(S: Show<A>): Show<Set<A>>;
/**
 * Convert a set to an Array
 */
export declare function toArray<A>(O: Ord<A>): (set: Set<A>) => ReadonlyArray<A>;
/**
 * Convert a set to an Array
 */
export declare function toArray_<A>(x: Set<A>, O: Ord<A>): ReadonlyArray<A>;
/**
 * Get Equal for Setgiven Equal for element
 */
export declare function getEqual<A>(E: Equal<A>): Equal<Set<A>>;
/**
 * true if one or more elements match predicate
 */
export declare function some<A>(predicate: Predicate<A>): (set: Set<A>) => boolean;
/**
 * true if one or more elements match predicate
 */
export declare function some_<A>(set: Set<A>, predicate: Predicate<A>): boolean;
/**
 * Projects a Set through a function
 */
export declare function map<B>(E: Equal<B>): <A>(f: (x: A) => B) => (set: Set<A>) => Set<B>;
/**
 * Projects a Set through a function
 */
export declare function map_<B>(E: Equal<B>): <A>(set: Set<A>, f: (x: A) => B) => Set<B>;
/**
 * true if all elements match predicate
 */
export declare function every<A>(predicate: Predicate<A>): (set: Set<A>) => boolean;
/**
 * true if all elements match predicate
 */
export declare function every_<A>(set: Set<A>, predicate: Predicate<A>): boolean;
/**
 * Map + Flatten
 */
export declare function chain<B>(E: Equal<B>): <A>(f: (x: A) => Set<B>) => (set: Set<A>) => Set<B>;
/**
 * Map + Flatten
 */
export declare function chain_<B>(E: Equal<B>): <A>(set: Set<A>, f: (x: A) => Set<B>) => Set<B>;
/**
 * `true` if and only if every element in the first set is an element of the second set
 */
export declare function isSubset<A>(E: Equal<A>): (y: Set<A>) => (x: Set<A>) => boolean;
/**
 * `true` if and only if every element in the first set is an element of the second set
 */
export declare function isSubset_<A>(E: Equal<A>): (x: Set<A>, y: Set<A>) => boolean;
/**
 * Filter set values using predicate
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Set<B>;
export declare function filter<A>(predicate: Predicate<A>): (set: Set<A>) => Set<A>;
/**
 * Filter set values using predicate
 */
export declare function filter_<A, B extends A>(set: Set<A>, refinement: Refinement<A, B>): Set<B>;
export declare function filter_<A>(set: Set<A>, predicate: Predicate<A>): Set<A>;
/**
 * Partition set values using predicate
 */
export declare function partition<A, B extends A>(refinement: Refinement<A, B>): (set: Set<A>) => Tp.Tuple<[Set<A>, Set<B>]>;
export declare function partition<A>(predicate: Predicate<A>): (set: Set<A>) => Tp.Tuple<[Set<A>, Set<A>]>;
/**
 * Partition set values using predicate
 */
export declare function partition_<A, B extends A>(set: Set<A>, refinement: Refinement<A, B>): Tp.Tuple<[Set<A>, Set<B>]>;
export declare function partition_<A>(set: Set<A>, predicate: Predicate<A>): Tp.Tuple<[Set<A>, Set<A>]>;
/**
 * Test if a value is a member of a set
 */
export declare function elem_<A>(E: Equal<A>): (set: Set<A>, a: A) => boolean;
/**
 * Test if a value is a member of a set
 */
export declare function elem<A>(E: Equal<A>): (a: A) => (set: Set<A>) => boolean;
/**
 * Partition elements according to f
 */
export declare function partitionMap<B, C>(EB: Equal<B>, EC: Equal<C>): <A>(f: (a: A) => Either<B, C>) => (set: Set<A>) => Tp.Tuple<[Set<B>, Set<C>]>;
/**
 * Partition elements according to f
 */
export declare function partitionMap_<B, C>(EB: Equal<B>, EC: Equal<C>): <A>(set: Set<A>, f: (a: A) => Either<B, C>) => Tp.Tuple<[Set<B>, Set<C>]>;
/**
 * Form the set difference (`x` - `y`)
 */
export declare function difference_<A>(E: Equal<A>): (l: Set<A>, r: Set<A>) => Set<A>;
/**
 * Form the set difference (`x` - `y`)
 */
export declare function difference<A>(E: Equal<A>): (y: Set<A>) => (x: Set<A>) => Set<A>;
/**
 * Reduce over the set values
 */
export declare function reduce<A>(O: Ord<A>): <B>(b: B, f: (b: B, a: A) => B) => (fa: Set<A>) => B;
/**
 * Reduce over the set values
 */
export declare function reduce_<A>(O: Ord<A>): <B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * Fold + Map
 */
export declare function foldMap<A, M>(O: Ord<A>, M: Identity<M>): (f: (a: A) => M) => (fa: Set<A>) => M;
/**
 * Fold + Map
 */
export declare function foldMap_<A, M>(O: Ord<A>, M: Identity<M>): (fa: Set<A>, f: (a: A) => M) => M;
/**
 * Create a set with one element
 */
export declare function singleton<A>(a: A): Set<A>;
/**
 * Insert a value into a set
 */
export declare function insert<A>(E: Equal<A>): (a: A) => (set: Set<A>) => Set<A>;
/**
 * Insert a value into a set
 */
export declare function insert_<A>(E: Equal<A>): (set: Set<A>, a: A) => Set<A>;
/**
 * Delete a value from a set
 */
export declare function remove<A>(E: Equal<A>): (a: A) => (set: Set<A>) => Set<A>;
/**
 * Delete a value from a set
 */
export declare function remove_<A>(E: Equal<A>): (set: Set<A>, a: A) => Set<A>;
/**
 * If element is present remove it, if not add it
 */
export declare function toggle<A>(E: Equal<A>): (a: A) => (set: Set<A>) => Set<A>;
/**
 * If element is present remove it, if not add it
 */
export declare function toggle_<A>(E: Equal<A>): (set: Set<A>, a: A) => Set<A>;
/**
 * Create a set from an array
 */
export declare function fromArray<A>(E: Equal<A>): (as: ReadonlyArray<A>) => Set<A>;
/**
 * Set compaction, remove none
 */
export declare function compact<A>(E: Equal<A>): (fa: Set<Option<A>>) => Set<A>;
/**
 * Separate elements
 */
export declare function separate<E, A>(EE: Equal<E>, EA: Equal<A>): (fa: Set<Either<E, A>>) => Tp.Tuple<[Set<E>, Set<A>]>;
/**
 * Filter + Map
 */
export declare function filterMap<B>(E: Equal<B>): <A>(f: (a: A) => Option<B>) => (fa: Set<A>) => Set<B>;
/**
 * Filter + Map
 */
export declare function filterMap_<B>(E: Equal<B>): <A>(fa: Set<A>, f: (a: A) => Option<B>) => Set<B>;
/**
 * Form the union of two sets
 */
export declare function union_<A>(E: Equal<A>): (set: Set<A>, y: Set<A>) => Set<A>;
/**
 * Form the union of two sets
 */
export declare function union<A>(E: Equal<A>): (y: Set<A>) => (set: Set<A>) => Set<A>;
//# sourceMappingURL=index.d.ts.map