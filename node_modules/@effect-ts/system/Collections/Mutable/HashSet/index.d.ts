export declare class HashSet<A> {
    private hashMap;
    constructor();
    size(): number;
    isEmpty(): boolean;
    contains(a: A): boolean;
    add(a: A): boolean;
    remove(a: A): boolean;
    [Symbol.iterator](): Iterator<A>;
}
/**
 * Creates a new set
 */
export declare function make<A>(): HashSet<A>;
/**
 * Creates a new set from an Iterable
 */
export declare function from<K, V>(xs: Iterable<V>): HashSet<V>;
/**
 * Calculate the number of values in a set
 */
export declare function size<A>(self: HashSet<A>): number;
/**
 * returns `true` if the set is empty
 */
export declare function isEmpty<A>(self: HashSet<A>): boolean;
/**
 * Creates a new set
 *
 * @ets_data_first contains_
 */
export declare function contains_<A>(self: HashSet<A>, a: A): boolean;
/**
 * return true if the set contains `a`
 *
 * @ets_data_first contains_
 */
export declare function contains<A>(a: A): (self: HashSet<A>) => boolean;
/**
 * add `a` to the set
 */
export declare function add_<A>(self: HashSet<A>, a: A): boolean;
/**
 * add `a` to the set
 *
 * @ets_data_first add_
 */
export declare function add<A>(a: A): (self: HashSet<A>) => boolean;
/**
 * remove `a` from the set
 */
export declare function remove_<A>(self: HashSet<A>, a: A): boolean;
/**
 * remove `a` from the set
 *
 * @ets_data_first remove_
 */
export declare function remove<A>(a: A): (self: HashSet<A>) => boolean;
//# sourceMappingURL=index.d.ts.map