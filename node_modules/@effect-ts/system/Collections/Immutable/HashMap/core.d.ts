import "../../../Operator/index.js";
import type { Refinement } from "../../../Function/index.js";
import * as O from "../../../Option/index.js";
import * as St from "../../../Structural/index.js";
import * as Tp from "../Tuple/index.js";
import type { Node, UpdateFn } from "./Nodes/index.js";
export declare class HashMap<K, V> implements Iterable<readonly [K, V]> {
    editable: boolean;
    edit: number;
    root: Node<K, V>;
    size: number;
    readonly _K: () => K;
    readonly _V: () => V;
    constructor(editable: boolean, edit: number, root: Node<K, V>, size: number);
    [Symbol.iterator](): Iterator<readonly [K, V]>;
    readonly tupleIterator: Iterable<Tp.Tuple<[K, V]>>;
    get [St.hashSym](): number;
    [St.equalsSym](that: unknown): boolean;
}
export declare class HashMapIterator<K, V, T> implements IterableIterator<T> {
    readonly map: HashMap<K, V>;
    readonly f: TraversalFn<K, V, T>;
    v: O.Option<VisitResult<K, V, T>>;
    constructor(map: HashMap<K, V>, f: TraversalFn<K, V, T>);
    next(): IteratorResult<T>;
    [Symbol.iterator](): IterableIterator<T>;
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
 * Set the root of the map
 */
export declare function setTree_<K, V>(map: HashMap<K, V>, newRoot: Node<K, V>, newSize: number): HashMap<K, V>;
/**
 * Lookup the value for `key` in `map` using custom hash.
 */
export declare function tryGetHash_<K, V>(map: HashMap<K, V>, key: K, hash: number): O.Option<V>;
/**
 * Lookup the value for `key` in `map` using custom hash.
 */
export declare function getHash_<K, V>(map: HashMap<K, V>, key: K, hash: number): O.Option<V>;
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */
export declare function unsafeGet_<K, V>(map: HashMap<K, V>, key: K): V;
/**
 * Lookup the value for `key` in `map` using internal hash function.
 *
 * @ets_data_first unsafeGet_
 */
export declare function unsafeGet<K>(key: K): <V>(map: HashMap<K, V>) => V;
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
 * Does an entry exist for `key` in `map`? Uses custom `hash`.
 */
export declare function hasHash_<K, V>(map: HashMap<K, V>, key: K, hash: number): boolean;
/**
 * Does an entry exist for `key` in `map`? Uses internal hash function.
 */
export declare function has_<K, V>(map: HashMap<K, V>, key: K): boolean;
/**
 * Does an entry exist for `key` in `map`? Uses internal hash function.
 *
 * @ets_data_first has_
 */
export declare function has<K>(key: K): <V>(map: HashMap<K, V>) => boolean;
/**
 * Does `map` contain any elements?
 */
export declare function isEmpty<K, V>(map: HashMap<K, V>): boolean;
/**
 * Alter the value stored for `key` in `map` using function `f` using custom hash.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 */
export declare function modifyHash_<K, V>(map: HashMap<K, V>, key: K, hash: number, f: UpdateFn<V>): HashMap<K, V>;
/**
 * Alter the value stored for `key` in `map` using function `f` using internal hash function.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 */
export declare function modify_<K, V>(map: HashMap<K, V>, key: K, f: UpdateFn<V>): HashMap<K, V>;
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
export declare function modify<K, V>(key: K, f: UpdateFn<V>): (map: HashMap<K, V>) => HashMap<K, V>;
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
 * Mark `map` as mutable.
 */
export declare function beginMutation<K, V>(map: HashMap<K, V>): HashMap<K, V>;
/**
 * Mark `map` as immutable.
 */
export declare function endMutation<K, V>(map: HashMap<K, V>): HashMap<K, V>;
/**
 * Mutate `map` within the context of `f`.
 *
 * @ets_data_first mutate_
 */
export declare function mutate<K, V>(f: (map: HashMap<K, V>) => void): (map: HashMap<K, V>) => HashMap<K, V>;
/**
 * Mutate `map` within the context of `f`.
 */
export declare function mutate_<K, V>(map: HashMap<K, V>, f: (map: HashMap<K, V>) => void): HashMap<K, V>;
export declare type Cont<K, V, A> = [
    len: number,
    children: Node<K, V>[],
    i: number,
    f: TraversalFn<K, V, A>,
    cont: Cont<K, V, A>
] | undefined;
export declare function applyCont<K, V, A>(cont: Cont<K, V, A>): O.None | O.Some<VisitResult<K, V, A>>;
export declare function visitLazyChildren<K, V, A>(len: number, children: Node<K, V>[], i: number, f: TraversalFn<K, V, A>, cont: Cont<K, V, A>): O.Option<VisitResult<K, V, A>>;
export interface VisitResult<K, V, A> {
    value: A;
    cont: Cont<K, V, A>;
}
export declare type TraversalFn<K, V, A> = (node: readonly [K, V]) => A;
/**
 * Visit each leaf lazily
 */
export declare function visitLazy<K, V, A>(node: Node<K, V>, f: TraversalFn<K, V, A>, cont?: Cont<K, V, A>): O.Option<VisitResult<K, V, A>>;
/**
 * Get an IterableIterator of the map keys
 */
export declare function keys<K, V>(map: HashMap<K, V>): IterableIterator<K>;
/**
 * Get an IterableIterator of the map values
 */
export declare function values<K, V>(map: HashMap<K, V>): IterableIterator<V>;
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
 * Reduce a state over the map entries
 */
export declare function reduceWithIndex_<K, V, Z>(map: HashMap<K, V>, z: Z, f: (z: Z, k: K, v: V) => Z): Z;
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduceWithIndex_
 */
export declare function reduceWithIndex<K, V, Z>(z: Z, f: (z: Z, k: K, v: V) => Z): (map: HashMap<K, V>) => Z;
/**
 * Reduce a state over the map entries
 */
export declare function reduce_<K, V, Z>(map: HashMap<K, V>, z: Z, f: (z: Z, v: V) => Z): Z;
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */
export declare function reduce<V, Z>(z: Z, f: (z: Z, v: V) => Z): <K>(map: HashMap<K, V>) => Z;
/**
 * Apply f to each element
 */
export declare function forEachWithIndex_<K, V>(map: HashMap<K, V>, f: (k: K, v: V) => void): void;
/**
 * Apply f to each element
 *
 * @ets_data_first forEachWithIndex_
 */
export declare function forEachWithIndex<K, V>(f: (k: K, v: V) => void): (map: HashMap<K, V>) => void;
/**
 * Apply f to each element
 */
export declare function forEach_<K, V>(map: HashMap<K, V>, f: (v: V) => void): void;
/**
 * Apply f to each element
 *
 * @ets_data_first forEach_
 */
export declare function forEach<V>(f: (v: V) => void): <K>(map: HashMap<K, V>) => void;
/**
 * Maps over the map entries
 */
export declare function mapWithIndex_<K, V, A>(map: HashMap<K, V>, f: (k: K, v: V) => A): HashMap<K, A>;
/**
 * Maps over the map entries
 *
 * @ets_data_first mapWithIndex_
 */
export declare function mapWithIndex<K, V, A>(f: (k: K, v: V) => A): (map: HashMap<K, V>) => HashMap<K, A>;
/**
 * Maps over the map entries
 */
export declare function map_<K, V, A>(map: HashMap<K, V>, f: (v: V) => A): HashMap<K, A>;
/**
 * Maps over the map entries
 *
 * @ets_data_first map_
 */
export declare function map<V, A>(f: (v: V) => A): <K>(map: HashMap<K, V>) => HashMap<K, A>;
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 */
export declare function chain_<K, V, A>(map: HashMap<K, V>, f: (v: V) => HashMap<K, A>): HashMap<K, A>;
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 *
 * @ets_data_first chain_
 */
export declare function chain<K, V, A>(f: (v: V) => HashMap<K, A>): (map: HashMap<K, V>) => HashMap<K, A>;
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 */
export declare function chainWithIndex_<K, V, A>(map: HashMap<K, V>, f: (k: K, v: V) => HashMap<K, A>): HashMap<K, A>;
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 *
 * @ets_data_first chainWithIndex_
 */
export declare function chainWithIndex<K, V, A>(f: (k: K, v: V) => HashMap<K, A>): (map: HashMap<K, V>) => HashMap<K, A>;
/**
 * Removes None values
 */
export declare function compact<K, A>(fa: HashMap<K, O.Option<A>>): HashMap<K, A>;
/**
 * Filter out None and map
 */
export declare function filterMapWithIndex_<K, A, B>(fa: HashMap<K, A>, f: (k: K, a: A) => O.Option<B>): HashMap<K, B>;
/**
 * Filter out None and map
 *
 * @ets_data_first filterMapWithIndex_
 */
export declare function filterMapWithIndex<K, A, B>(f: (k: K, a: A) => O.Option<B>): (fa: HashMap<K, A>) => HashMap<K, B>;
/**
 * Filter out None and map
 */
export declare function filterMap_<E, A, B>(fa: HashMap<E, A>, f: (a: A) => O.Option<B>): HashMap<E, B>;
/**
 * Filter out None and map
 *
 * @ets_data_first filterMap_
 */
export declare function filterMap<A, B>(f: (a: A) => O.Option<B>): <E>(fa: HashMap<E, A>) => HashMap<E, B>;
/**
 * Filter out by predicate
 */
export declare function filterWithIndex_<K, A>(fa: HashMap<K, A>, p: (k: K, a: A) => boolean): HashMap<K, A>;
/**
 * Filter out by predicate
 *
 * @ets_data_first filterWithIndex_
 */
export declare function filterWithIndex<K, A>(p: (k: K, a: A) => boolean): (fa: HashMap<K, A>) => HashMap<K, A>;
/**
 * Filter out by predicate
 */
export declare function filter_<K, A, B extends A>(fa: HashMap<K, A>, p: Refinement<A, B>): HashMap<K, B>;
export declare function filter_<K, A>(fa: HashMap<K, A>, p: (a: A) => boolean): HashMap<K, A>;
/**
 * Filter out by predicate
 *
 * @ets_data_first filter_
 */
export declare function filter<A, B extends A>(p: Refinement<A, B>): <K>(fa: HashMap<K, A>) => HashMap<K, A>;
/**
 * Calculate the number of key/value pairs in a map
 */
export declare function size<K, V>(map: HashMap<K, V>): number;
/**
 * Remove many keys
 */
export declare function removeMany_<K, V>(self: HashMap<K, V>, ks: Iterable<K>): HashMap<K, V>;
/**
 * Remove many keys
 *
 * @ets_data_first removeMany_
 */
export declare function removeMany<K>(ks: Iterable<K>): <V>(self: HashMap<K, V>) => HashMap<K, V>;
//# sourceMappingURL=core.d.ts.map