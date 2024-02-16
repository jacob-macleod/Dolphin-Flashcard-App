import "../../../Operator/index.js";
import type { Equal } from "../../../Equal/index.js";
import type { Predicate, Refinement } from "../../../Function/index.js";
import * as St from "../../../Structural/index.js";
import * as HM from "../HashMap/core.js";
import * as Tp from "../Tuple/index.js";
export declare class HashSet<V> implements Iterable<V>, St.HasHash, St.HasEquals {
    readonly keyMap: HM.HashMap<V, unknown>;
    constructor(keyMap: HM.HashMap<V, unknown>);
    [Symbol.iterator](): Iterator<V>;
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare function make<V>(): HashSet<V>;
/**
 * Creates a new set from an Iterable
 */
export declare function from<K, V>(xs: Iterable<V>): HashSet<V>;
export declare function add_<V>(set: HashSet<V>, v: V): HashSet<V>;
export declare function add<V>(v: V): (set: HashSet<V>) => HashSet<V>;
export declare function remove_<V>(set: HashSet<V>, v: V): HashSet<V>;
export declare function remove<V>(v: V): (set: HashSet<V>) => HashSet<V>;
export declare function values<V>(set: HashSet<V>): IterableIterator<V>;
export declare function has_<V>(set: HashSet<V>, v: V): boolean;
/**
 * Apply f to each element
 */
export declare function forEach_<V>(map: HashSet<V>, f: (v: V) => void): void;
/**
 * Mutate `set` within the context of `f`.
 */
export declare function mutate_<V>(set: HashSet<V>, transient: (set: HashSet<V>) => void): HashSet<V>;
/**
 * The set of elements which are in both the first and second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */
export declare function intersection_<A>(l: HashSet<A>, r: Iterable<A>): HashSet<A>;
/**
 * The set of elements which are in both the first and second set
 *
 * @ets_data_first intersection_
 */
export declare function intersection<A>(r: Iterable<A>): (l: HashSet<A>) => HashSet<A>;
/**
 * Projects a Set through a function
 */
export declare function map_<A, B>(set: HashSet<A>, f: (x: A) => B): HashSet<B>;
/**
 * Projects a Set through a function
 *
 * @ets_data_first map_
 */
export declare function map<A, B>(f: (x: A) => B): (set: HashSet<A>) => HashSet<B>;
/**
 * true if one or more elements match predicate
 *
 * @ets_data_first some_
 */
export declare function some<A>(predicate: Predicate<A>): (set: HashSet<A>) => boolean;
/**
 * true if one or more elements match predicate
 */
export declare function some_<A>(set: HashSet<A>, predicate: Predicate<A>): boolean;
/**
 * Calculate the number of keys pairs in a set
 */
export declare function size<A>(set: HashSet<A>): number;
/**
 * Creates an equal for a set
 */
export declare function equal<A>(): Equal<HashSet<A>>;
/**
 * true if all elements match predicate
 *
 * @ets_data_first every_
 */
export declare function every<A>(predicate: Predicate<A>): (set: HashSet<A>) => boolean;
/**
 * true if all elements match predicate
 */
export declare function every_<A>(set: HashSet<A>, predicate: Predicate<A>): boolean;
/**
 * Map + Flatten
 *
 * @ets_data_first chain_
 */
export declare function chain<A, B>(f: (x: A) => Iterable<B>): (set: HashSet<A>) => HashSet<B>;
/**
 * Map + Flatten
 */
export declare function chain_<A, B>(set: HashSet<A>, f: (x: A) => Iterable<B>): HashSet<B>;
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @ets_data_first isSubset_
 */
export declare function isSubset<A>(y: HashSet<A>): (x: HashSet<A>) => boolean;
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */
export declare function isSubset_<A>(x: HashSet<A>, y: HashSet<A>): boolean;
/**
 * Filter set values using predicate
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(refinement: Refinement<A, B>): (set: HashSet<A>) => HashSet<B>;
export declare function filter<A>(predicate: Predicate<A>): (set: HashSet<A>) => HashSet<A>;
/**
 * Filter set values using predicate
 */
export declare function filter_<A, B extends A>(set: HashSet<A>, refinement: Refinement<A, B>): HashSet<B>;
export declare function filter_<A>(set: HashSet<A>, predicate: Predicate<A>): HashSet<A>;
/**
 * Partition set values using predicate
 *
 * @ets_data_first partition_
 */
export declare function partition<A, B extends A>(refinement: Refinement<A, B>): (set: HashSet<A>) => Tp.Tuple<[HashSet<A>, HashSet<B>]>;
export declare function partition<A>(predicate: Predicate<A>): (set: HashSet<A>) => Tp.Tuple<[HashSet<A>, HashSet<A>]>;
/**
 * Partition set values using predicate
 */
export declare function partition_<A, B extends A>(set: HashSet<A>, refinement: Refinement<A, B>): Tp.Tuple<[HashSet<A>, HashSet<B>]>;
export declare function partition_<A>(set: HashSet<A>, predicate: Predicate<A>): Tp.Tuple<[HashSet<A>, HashSet<A>]>;
/**
 * Mark `set` as mutable.
 */
export declare function beginMutation<K>(set: HashSet<K>): HashSet<K>;
/**
 * Mark `set` as immutable.
 */
export declare function endMutation<K>(set: HashSet<K>): HashSet<K>;
/**
 * Form the set difference (`x` - `y`)
 */
export declare function difference_<A>(x: HashSet<A>, y: Iterable<A>): HashSet<A>;
/**
 * Form the set difference (`x` - `y`)
 *
 * @ets_data_first difference_
 */
export declare function difference<A>(y: Iterable<A>): (x: HashSet<A>) => HashSet<A>;
/**
 * Reduce a state over the map entries
 */
export declare function reduce_<V, Z>(set: HashSet<V>, z: Z, f: (z: Z, v: V) => Z): Z;
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */
export declare function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z): (set: HashSet<V>) => Z;
/**
 * If element is present remove it, if not add it
 *
 * @ets_data_first toggle_
 */
export declare function toggle<A>(a: A): (set: HashSet<A>) => HashSet<A>;
/**
 * If element is present remove it, if not add it
 */
export declare function toggle_<A>(set: HashSet<A>, a: A): HashSet<A>;
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 */
export declare function union_<A>(l: HashSet<A>, r: Iterable<A>): HashSet<A>;
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @ets_data_first union_
 */
export declare function union<A>(y: Iterable<A>): (x: HashSet<A>) => HashSet<A>;
//# sourceMappingURL=index.d.ts.map