import * as O from "../../Option/index.js";
import * as STM from "../STM/index.js";
import * as TRef from "../TRef/index.js";
export declare const TArrayTypeId: unique symbol;
export declare type TArrayTypeId = typeof TArrayTypeId;
export declare class TArray<A> {
    readonly array: readonly TRef.TRef<A>[];
    readonly _typeId: TArrayTypeId;
    constructor(array: readonly TRef.TRef<A>[]);
}
/**
 * Makes a new `TArray` initialized with provided iterable.
 */
export declare function fromIterable<A>(it: Iterable<A>): STM.STM<unknown, never, TArray<A>>;
/**
 * Makes a new `TArray` that is initialized with specified values.
 */
export declare function make<ARGS extends any[]>(...data: ARGS): STM.STM<unknown, never, TArray<ARGS[number]>>;
/**
 * Makes a new `TArray` that is initialized with specified values.
 */
export declare function empty<A>(): STM.STM<unknown, never, TArray<A>>;
/**
 * Extracts value from ref in array.
 */
export declare function get_<A>(self: TArray<A>, index: number): STM.STM<unknown, never, A>;
/**
 * Extracts value from ref in array.
 *
 * @ets_data_first get_
 */
export declare function get(index: number): <A>(self: TArray<A>) => STM.STM<unknown, never, A>;
/**
 * Find the first element in the array matching a predicate.
 */
export declare function find_<A>(self: TArray<A>, p: (a: A) => boolean): STM.STM<unknown, never, O.Option<A>>;
/**
 * Find the first element in the array matching a predicate.
 *
 * @ets_data_first find_
 */
export declare function find<A>(p: (a: A) => boolean): (self: TArray<A>) => STM.STM<unknown, never, O.Option<A>>;
/**
 * Find the last element in the array matching a predicate.
 */
export declare function findLast_<A>(self: TArray<A>, p: (a: A) => boolean): STM.STM<unknown, never, O.Option<A>>;
/**
 * Find the last element in the array matching a predicate.
 *
 * @ets_data_first find_
 */
export declare function findLast<A>(p: (a: A) => boolean): (self: TArray<A>) => STM.STM<unknown, never, O.Option<A>>;
//# sourceMappingURL=index.d.ts.map