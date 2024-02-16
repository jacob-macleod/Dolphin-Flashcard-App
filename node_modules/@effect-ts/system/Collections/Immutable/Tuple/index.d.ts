import * as Tp from "../../../Structural/index.js";
import type { ForcedArray } from "../../../Utils/index.js";
export declare const TupleSym: unique symbol;
export declare type TupleSym = typeof TupleSym;
export declare function isTuple(self: unknown): self is Tuple<unknown[]>;
export declare class Tuple<T extends readonly unknown[]> implements Iterable<T[number]> {
    readonly tuple: T;
    [TupleSym](): TupleSym;
    constructor(tuple: T);
    [Symbol.iterator](): IterableIterator<T[number]>;
    get [Tp.hashSym](): number;
    [Tp.equalsSym](that: unknown): boolean;
    get<K extends keyof T>(i: K): T[K];
}
/**
 * Creates a new Tuple
 */
export declare function tuple<Ks extends unknown[]>(...args: Ks): Tuple<Ks>;
/**
 * Gets an element from the tuple
 *
 * @ets_data_first get_
 */
export declare function get<Ks extends unknown[], I extends keyof Ks>(i: I): (self: Tuple<Ks>) => Ks[I];
/**
 * Gets an element from the tuple
 */
export declare function get_<Ks extends unknown[], I extends keyof Ks>(self: Tuple<Ks>, i: I): Ks[I];
/**
 * Converts to native tuple type
 */
export declare function toNative<Ks extends readonly unknown[]>(self: Tuple<Ks>): Ks;
/**
 * Converts from native tuple type
 */
export declare function fromNative<Ks extends readonly unknown[]>(self: Ks): Tuple<Ks>;
/**
 * Replaces the element in position I
 *
 * @ets_data_first update_
 */
export declare function update<Ks extends readonly unknown[], I extends keyof Ks & number, J>(i: I, f: (_: Ks[I]) => J): (self: Tuple<Ks>) => Tuple<ForcedArray<{
    [k in keyof Ks]: k extends `${I}` ? J : Ks[k];
}>>;
/**
 * Replaces the element in position I
 */
export declare function update_<Ks extends readonly unknown[], I extends keyof Ks & number, J>(self: Tuple<Ks>, i: I, f: (_: Ks[I]) => J): Tuple<ForcedArray<{
    [k in keyof Ks]: k extends `${I}` ? J : Ks[k];
}>>;
/**
 * Appends a value to a tuple
 *
 * @ets_data_first append_
 */
export declare function append<K>(k: K): <Ks extends unknown[]>(self: Tuple<Ks>) => Tuple<[...Ks, K]>;
/**
 * Appends a value to a tuple
 */
export declare function append_<Ks extends unknown[], K>(self: Tuple<Ks>, k: K): Tuple<[...Ks, K]>;
/**
 * Appends a value to a tuple
 *
 * @ets_data_first prepend_
 */
export declare function prepend<K>(k: K): <Ks extends unknown[]>(self: Tuple<Ks>) => Tuple<[K, ...Ks]>;
/**
 * Prepends a value to a tuple
 */
export declare function prepend_<Ks extends unknown[], K>(self: Tuple<Ks>, k: K): Tuple<[K, ...Ks]>;
/**
 * Concat tuples
 *
 * @ets_data_first concat_
 */
export declare function concat<Hs extends unknown[]>(that: Tuple<Hs>): <Ks extends unknown[]>(self: Tuple<Ks>) => Tuple<[...Ks, ...Hs]>;
/**
 * Concat tuples
 */
export declare function concat_<Ks extends unknown[], Hs extends unknown[]>(self: Tuple<Ks>, that: Tuple<Hs>): Tuple<[...Ks, ...Hs]>;
//# sourceMappingURL=index.d.ts.map