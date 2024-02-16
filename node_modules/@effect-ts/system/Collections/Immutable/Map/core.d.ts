import * as Op from "../../../Option/index.js";
import type { MutableMap } from "../../../Support/Mutable/index.js";
import * as Tp from "../Tuple/index.js";
/**
 * Map type
 */
export declare type Map<K, T> = ReadonlyMap<K, T>;
/**
 * Create from a key-value array
 */
export declare function make<K, V>(values: Iterable<readonly [K, V] | Tp.Tuple<[K, V]>>): Map<K, V>;
/**
 * Removes None values
 */
export declare function compact<K, A>(fa: Map<K, Op.Option<A>>): Map<K, A>;
/**
 * Empty Map
 */
export declare const empty: Map<never, never>;
/**
 * Filter out None and map
 */
export declare function filterMap_<E, A, B>(fa: Map<E, A>, f: (a: A) => Op.Option<B>): Map<E, B>;
/**
 * Filter out None and map
 */
export declare function filterMap<A, B>(f: (a: A) => Op.Option<B>): <E>(fa: Map<E, A>) => Map<E, B>;
/**
 * Filter out None and map
 */
export declare function filterMapWithIndex_<K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => Op.Option<B>): Map<K, B>;
/**
 * Filter out None and map
 */
export declare function filterMapWithIndex<K, A, B>(f: (k: K, a: A) => Op.Option<B>): (fa: Map<K, A>) => Map<K, B>;
/**
 * Filter out None and map
 */
export declare function filterWithIndex_<K, A>(fa: Map<K, A>, p: (k: K, a: A) => boolean): Map<K, A>;
/**
 * Filter out None and map
 */
export declare function filterWithIndex<K, A>(p: (k: K, a: A) => boolean): (fa: Map<K, A>) => Map<K, A>;
/**
 * Construct a new Readonly Map
 */
export declare function fromMutable<K, A>(m: MutableMap<K, A>): Map<K, A>;
/**
 * Test whether or not a map is empty
 */
export declare function isEmpty<K, A>(d: Map<K, A>): boolean;
/**
 * Maps values using f
 */
export declare function map_<E, A, B>(fa: Map<E, A>, f: (a: A) => B): Map<E, B>;
/**
 * Maps values using f
 */
export declare function map<A, B>(f: (a: A) => B): <E>(fa: Map<E, A>) => Map<E, B>;
/**
 * Maps values using f
 */
export declare function mapWithIndex_<K, A, B>(fa: Map<K, A>, f: (k: K, a: A) => B): Map<K, B>;
/**
 * Maps values using f
 */
export declare function mapWithIndex<K, A, B>(f: (k: K, a: A) => B): (fa: Map<K, A>) => Map<K, B>;
export interface Next<A> {
    readonly done?: boolean;
    readonly value: A;
}
/**
 * Create a map with one key/value pair
 */
export declare function singleton<K, A>(k: K, a: A): Map<K, A>;
/**
 * Calculate the number of key/value pairs in a map
 */
export declare function size<K, A>(d: Map<K, A>): number;
/**
 * Construct a new mutable map by copying this one
 */
export declare function toMutable<K, A>(m: Map<K, A>): MutableMap<K, A>;
export declare function insert_<K, V>(self: ReadonlyMap<K, V>, k: K, v: V): ReadonlyMap<K, V>;
export declare function insert<K, V>(k: K, v: V): (self: ReadonlyMap<K, V>) => ReadonlyMap<K, V>;
export declare function remove_<K, V>(self: ReadonlyMap<K, V>, k: K): ReadonlyMap<K, V>;
export declare function remove<K>(k: K): <V>(self: ReadonlyMap<K, V>) => ReadonlyMap<K, V>;
export declare function removeMany_<K, V>(self: ReadonlyMap<K, V>, ks: Iterable<K>): ReadonlyMap<K, V>;
export declare function removeMany<K>(ks: Iterable<K>): <V>(self: ReadonlyMap<K, V>) => ReadonlyMap<K, V>;
export declare function lookup_<K, V>(m: ReadonlyMap<K, V>, k: K): Op.Option<NonNullable<V>>;
export declare function lookup<K>(k: K): <V>(m: ReadonlyMap<K, V>) => Op.Option<NonNullable<V>>;
export declare function copy<K, V>(self: ReadonlyMap<K, V>): globalThis.Map<K, V>;
//# sourceMappingURL=core.d.ts.map