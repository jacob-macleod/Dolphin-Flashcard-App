import * as O from "../../../Option/index.js";
import { AtomicNumber } from "../../../Support/AtomicNumber/index.js";
export declare const HashMapTypeId: unique symbol;
export declare type HashMapTypeId = typeof HashMapTypeId;
declare class Node<K, V> implements Iterable<readonly [K, V]> {
    readonly k: K;
    v: V;
    next?: Node<K, V> | undefined;
    constructor(k: K, v: V, next?: Node<K, V> | undefined);
    [Symbol.iterator](): Iterator<readonly [K, V]>;
}
/**
 * A Mutable HashMap
 */
export declare class HashMap<K, V> implements Iterable<readonly [K, V]> {
    readonly _typeId: HashMapTypeId;
    readonly backingMap: Map<number, Node<K, V>>;
    readonly length: AtomicNumber;
    get(k: K): O.Option<V>;
    remove(k: K): HashMap<K, V>;
    set(k: K, v: V): HashMap<K, V>;
    update(k: K, f: (v: V) => V): HashMap<K, V>;
    [Symbol.iterator](): Iterator<readonly [K, V]>;
}
/**
 * Creates a new map
 */
export declare function make<K, V>(): HashMap<K, V>;
/**
 * Creates a new map from an Iterable
 */
export declare function from<K, V>(xs: Iterable<readonly [K, V]>): HashMap<K, V>;
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */
export declare function get_<K, V>(map: HashMap<K, V>, key: K): O.Option<V>;
/**
 * Lookup the value for `key` in `map` using internal hash function.
 *
 * @ets_data_first get_
 */
export declare function get<K>(key: K): <V>(map: HashMap<K, V>) => O.Option<V>;
/**
 * Store `value` for `key` in `map` using internal hash function.
 */
export declare function set_<K, V>(map: HashMap<K, V>, key: K, value: V): HashMap<K, V>;
/**
 * Store `value` for `key` in `map` using internal hash function.
 *
 * @ets_data_first set_
 */
export declare function set<K, V>(key: K, value: V): (map: HashMap<K, V>) => HashMap<K, V>;
/**
 * Remove the entry for `key` in `map` using internal hash.
 */
export declare function remove_<K, V>(map: HashMap<K, V>, key: K): HashMap<K, V>;
/**
 * Remove the entry for `key` in `map` using internal hash.
 *
 * @ets_data_first remove_
 */
export declare function remove<K>(key: K): <V>(map: HashMap<K, V>) => HashMap<K, V>;
/**
 * Calculate the number of key/value pairs in a map
 */
export declare function size<K, V>(map: HashMap<K, V>): number;
/**
 * Update a value if exists
 */
export declare function update_<K, V>(map: HashMap<K, V>, key: K, f: (v: V) => V): HashMap<K, V>;
/**
 * Update a value if exists
 *
 * @ets_data_first update_
 */
export declare function update<K, V>(key: K, f: (v: V) => V): (map: HashMap<K, V>) => HashMap<K, V>;
/**
 * Alter the value stored for `key` in `map` using function `f` using internal hash function.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 */
export declare function modify_<K, V>(map: HashMap<K, V>, key: K, f: (v: O.Option<V>) => O.Option<V>): HashMap<K, V>;
/**
 * Alter the value stored for `key` in `map` using function `f` using internal hash function.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 *
 * @ets_data_first modify_
 */
export declare function modify<K, V>(key: K, f: (v: O.Option<V>) => O.Option<V>): (map: HashMap<K, V>) => HashMap<K, V>;
export {};
//# sourceMappingURL=index.d.ts.map