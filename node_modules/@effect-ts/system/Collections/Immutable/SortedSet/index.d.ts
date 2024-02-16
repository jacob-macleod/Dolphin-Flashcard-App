import "../../../Operator/index.js";
import type { Equal } from "../../../Equal/index.js";
import type { Predicate, Refinement } from "../../../Function/index.js";
import type { Ord } from "../../../Ord/index.js";
import * as St from "../../../Structural/index.js";
import * as RB from "../RedBlackTree/index.js";
import * as Tp from "../Tuple/index.js";
export declare class SortedSet<V> implements Iterable<V> {
    readonly keyTree: RB.RedBlackTree<V, any>;
    constructor(keyTree: RB.RedBlackTree<V, any>);
    [Symbol.iterator](): Iterator<V>;
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare function make<V>(K: Ord<V>): SortedSet<V>;
export declare function add_<V>(set: SortedSet<V>, v: V): SortedSet<V>;
export declare function add<V>(v: V): (set: SortedSet<V>) => SortedSet<V>;
export declare function remove_<V>(set: SortedSet<V>, v: V): SortedSet<V>;
export declare function remove<V>(v: V): (set: SortedSet<V>) => SortedSet<V>;
export declare function values<V>(set: SortedSet<V>): IterableIterator<V>;
export declare function has_<V>(set: SortedSet<V>, v: V): boolean;
/**
 * Apply f to each element
 */
export declare function forEach_<V>(map: SortedSet<V>, f: (v: V) => void): void;
/**
 * The set of elements which are in both the first and second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */
export declare function intersection_<A>(l: SortedSet<A>, r: Iterable<A>): SortedSet<A>;
/**
 * The set of elements which are in both the first and second set
 *
 * @ets_data_first intersection_
 */
export declare function intersection<A>(r: Iterable<A>): (l: SortedSet<A>) => SortedSet<A>;
/**
 * Projects a Set through a function
 */
export declare function map_<B>(E: Ord<B>): <A>(set: SortedSet<A>, f: (x: A) => B) => SortedSet<B>;
/**
 * Projects a Set through a function
 *
 * @ets_data_first map_
 */
export declare function map<B>(E: Ord<B>): <A>(f: (x: A) => B) => (set: SortedSet<A>) => SortedSet<B>;
/**
 * true if one or more elements match predicate
 *
 * @ets_data_first some_
 */
export declare function some<A>(predicate: Predicate<A>): (set: SortedSet<A>) => boolean;
/**
 * true if one or more elements match predicate
 */
export declare function some_<A>(set: SortedSet<A>, predicate: Predicate<A>): boolean;
/**
 * Calculate the number of keys pairs in a set
 */
export declare function size<A>(set: SortedSet<A>): number;
/**
 * Creates an equal for a set
 */
export declare function equal<A>(): Equal<SortedSet<A>>;
/**
 * true if all elements match predicate
 *
 * @ets_data_first every_
 */
export declare function every<A>(predicate: Predicate<A>): (set: SortedSet<A>) => boolean;
/**
 * true if all elements match predicate
 */
export declare function every_<A>(set: SortedSet<A>, predicate: Predicate<A>): boolean;
/**
 * Map + Flatten
 *
 * @ets_data_first chain_
 */
export declare function chain<B>(E: Ord<B>): <A>(f: (x: A) => Iterable<B>) => (set: SortedSet<A>) => SortedSet<B>;
/**
 * Map + Flatten
 */
export declare function chain_<B>(E: Ord<B>): <A>(set: SortedSet<A>, f: (x: A) => Iterable<B>) => SortedSet<B>;
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @ets_data_first isSubset_
 */
export declare function isSubset<A>(y: SortedSet<A>): (x: SortedSet<A>) => boolean;
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */
export declare function isSubset_<A>(x: SortedSet<A>, y: SortedSet<A>): boolean;
/**
 * Filter set values using predicate
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: SortedSet<A>) => SortedSet<B>;
export declare function filter<A>(predicate: Predicate<A>): (set: SortedSet<A>) => SortedSet<A>;
/**
 * Filter set values using predicate
 */
export declare function filter_<A, B extends A>(set: SortedSet<A>, refinement: Refinement<A, B>): SortedSet<B>;
export declare function filter_<A>(set: SortedSet<A>, predicate: Predicate<A>): SortedSet<A>;
/**
 * Partition set values using predicate
 *
 * @ets_data_first partition_
 */
export declare function partition<A, B extends A>(refinement: Refinement<A, B>): (set: SortedSet<A>) => Tp.Tuple<[SortedSet<A>, SortedSet<B>]>;
export declare function partition<A>(predicate: Predicate<A>): (set: SortedSet<A>) => Tp.Tuple<[SortedSet<A>, SortedSet<A>]>;
/**
 * Partition set values using predicate
 */
export declare function partition_<A, B extends A>(set: SortedSet<A>, refinement: Refinement<A, B>): Tp.Tuple<[SortedSet<A>, SortedSet<B>]>;
export declare function partition_<A>(set: SortedSet<A>, predicate: Predicate<A>): Tp.Tuple<[SortedSet<A>, SortedSet<A>]>;
/**
 * Form the set difference (`x` - `y`)
 */
export declare function difference_<A>(x: SortedSet<A>, y: Iterable<A>): SortedSet<A>;
/**
 * Form the set difference (`x` - `y`)
 *
 * @ets_data_first difference_
 */
export declare function difference<A>(y: Iterable<A>): (x: SortedSet<A>) => SortedSet<A>;
/**
 * Reduce a state over the map entries
 */
export declare function reduce_<V, Z>(set: SortedSet<V>, z: Z, f: (z: Z, v: V) => Z): Z;
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */
export declare function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z): (set: SortedSet<V>) => Z;
/**
 * If element is present remove it, if not add it
 *
 * @ets_data_first toggle_
 */
export declare function toggle<A>(a: A): (set: SortedSet<A>) => SortedSet<A>;
/**
 * If element is present remove it, if not add it
 */
export declare function toggle_<A>(set: SortedSet<A>, a: A): SortedSet<A>;
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 */
export declare function union_<A>(l: SortedSet<A>, r: Iterable<A>): SortedSet<A>;
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @ets_data_first union_
 */
export declare function union<A>(y: Iterable<A>): (x: SortedSet<A>) => SortedSet<A>;
//# sourceMappingURL=index.d.ts.map