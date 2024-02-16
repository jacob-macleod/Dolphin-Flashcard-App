import "../../../Operator/index.js";
import type { Either } from "../../../Either/index.js";
import type { Predicate, Refinement } from "../../../Function/index.js";
import * as O from "../../../Option/index.js";
import type { MutableRecord } from "../../../Support/Mutable/index.js";
import type { PredicateWithIndex, RefinementWithIndex } from "../../../Utils/index.js";
import * as Tp from "../Tuple/index.js";
export declare type Dictionary<T> = {
    readonly [P in string]: T;
};
/**
 * Build a readonly record from a mutable version
 */
export declare function fromMutable<A>(r: MutableRecord<string, A>): Dictionary<A>;
/**
 * Converts the record to a mutable version
 */
export declare function toMutable<A>(r: Dictionary<A>): MutableRecord<string, A>;
/**
 * Calculate the number of key/value pairs in a record
 */
export declare function size(r: Dictionary<unknown>): number;
/**
 * Test whether a record is empty
 */
export declare function isEmpty(r: Dictionary<unknown>): boolean;
/**
 * Extract record keys
 */
export declare function keys(r: Dictionary<unknown>): ReadonlyArray<string>;
/**
 * Extract record values
 */
export declare function values<V>(r: Dictionary<V>): ReadonlyArray<V>;
/**
 * Map a record into an array
 */
export declare function collect<A, B>(f: (k: string, a: A) => B): (r: Dictionary<A>) => ReadonlyArray<B>;
/**
 * Map a record into an array
 */
export declare function collect_<A, B>(r: Dictionary<A>, f: (k: string, a: A) => B): ReadonlyArray<B>;
/**
 * Insert or replace a key/value pair in a record
 */
export declare function insertAt<A>(k: string, a: A): (r: Dictionary<A>) => Dictionary<A>;
/**
 * Insert or replace a key/value pair in a record
 */
export declare function insertAt_<A>(r: Dictionary<A>, k: string, a: A): Dictionary<A>;
/**
 * Check if k is a key
 */
export declare function hasOwnProperty(r: Dictionary<unknown>, k: string): boolean;
/**
 * Delete a key
 */
export declare function deleteAt(k: string): <A>(r: Dictionary<A>) => Dictionary<A>;
/**
 * Delete a key
 */
export declare function deleteAt_<A>(r: Dictionary<A>, k: string): Dictionary<A>;
/**
 * Update a key value pair
 */
export declare function updateAt<A>(k: string, a: A): (r: Dictionary<A>) => O.Option<Dictionary<A>>;
/**
 * Update a key value pair
 */
export declare function updateAt_<A>(r: Dictionary<A>, k: string, a: A): O.Option<Dictionary<A>>;
/**
 * Modify the value at key k with f
 */
export declare function modifyAt<A>(k: string, f: (a: A) => A): (r: Dictionary<A>) => O.Option<Dictionary<A>>;
/**
 * Modify the value at key k with f
 */
export declare function modifyAt_<A>(r: Dictionary<A>, k: string, f: (a: A) => A): O.Option<Dictionary<A>>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 */
export declare function pop(k: string): <A>(r: Dictionary<A>) => O.Option<Tp.Tuple<[A, Dictionary<A>]>>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 */
export declare function pop_<A>(r: Dictionary<A>, k: string): O.Option<Tp.Tuple<[A, Dictionary<A>]>>;
/**
 * Lookup the value for a key in a record
 */
export declare function lookup_<A>(r: Dictionary<A>, k: string): O.Option<A>;
/**
 * Lookup the value for a key in a record
 */
export declare function lookup(k: string): <A>(r: Dictionary<A>) => O.Option<A>;
/**
 * Empty record
 */
export declare const empty: Dictionary<never>;
/**
 * Map a record passing the keys to the iterating function
 */
export declare function mapWithIndex<A, B>(f: (k: string, a: A) => B): (fa: Dictionary<A>) => Dictionary<B>;
/**
 * Map a record passing the keys to the iterating function
 */
export declare function mapWithIndex_<A, B>(fa: Dictionary<A>, f: (k: string, a: A) => B): Dictionary<B>;
/**
 * Map a record passing the values to the iterating function
 */
export declare function map<A, B>(f: (a: A) => B): (fa: Dictionary<A>) => Dictionary<B>;
/**
 * Map a record passing the values to the iterating function
 */
export declare function map_<A, B>(fa: Dictionary<A>, f: (a: A) => B): Dictionary<B>;
/**
 * Reduce the record passing the index toghether with the value to f
 */
export declare function reduceWithIndex<A, B>(b: B, f: (k: string, b: B, a: A) => B): (fa: Dictionary<A>) => B;
/**
 * Reduce the record passing the index toghether with the value to f
 */
export declare function reduceWithIndex_<A, B>(fa: Dictionary<A>, b: B, f: (k: string, b: B, a: A) => B): B;
/**
 * Reduce the record passing the index toghether with the value to f
 *
 * Inverted order
 */
export declare function reduceRightWithIndex<A, B>(b: B, f: (k: string, a: A, b: B) => B): (fa: Dictionary<A>) => B;
/**
 * Reduce the record passing the index toghether with the value to f
 *
 * Inverted order
 */
export declare function reduceRightWithIndex_<A, B>(fa: Dictionary<A>, b: B, f: (k: string, a: A, b: B) => B): B;
/**
 * Create a record with one key/value pair
 */
export declare function singleton<A>(k: string, a: A): Dictionary<A>;
/**
 * Partition a record using f that also consumes the entry key
 */
export declare function partitionMapWithIndex<A, B, C>(f: (key: string, a: A) => Either<B, C>): (fa: Dictionary<A>) => Tp.Tuple<[Dictionary<B>, Dictionary<C>]>;
/**
 * Partition a record using f that also consumes the entry key
 */
export declare function partitionMapWithIndex_<A, B, C>(fa: Dictionary<A>, f: (key: string, a: A) => Either<B, C>): Tp.Tuple<[Dictionary<B>, Dictionary<C>]>;
/**
 * Partition a record using a predicate that also consumes the entry key
 */
export declare function partitionWithIndex<A, B extends A>(refinementWithIndex: RefinementWithIndex<string, A, B>): (fa: Dictionary<A>) => Tp.Tuple<[Dictionary<A>, Dictionary<B>]>;
export declare function partitionWithIndex<A>(predicateWithIndex: PredicateWithIndex<string, A>): (fa: Dictionary<A>) => Tp.Tuple<[Dictionary<A>, Dictionary<A>]>;
/**
 * Partition a record using a predicate that also consumes the entry key
 */
export declare function partitionWithIndex_<A, B extends A>(fa: Dictionary<A>, refinementWithIndex: RefinementWithIndex<string, A, B>): Tp.Tuple<[Dictionary<A>, Dictionary<B>]>;
export declare function partitionWithIndex_<A>(fa: Dictionary<A>, predicateWithIndex: PredicateWithIndex<string, A>): Tp.Tuple<[Dictionary<A>, Dictionary<A>]>;
/**
 * Filter & map the record entries with f that consumes also the entry index
 */
export declare function filterMapWithIndex<A, B>(f: (key: string, a: A) => O.Option<B>): (fa: Dictionary<A>) => Dictionary<B>;
/**
 * Filter & map the record entries with f that consumes also the entry index
 */
export declare function filterMapWithIndex_<A, B>(fa: Dictionary<A>, f: (key: string, a: A) => O.Option<B>): Dictionary<B>;
/**
 * Filter the record entries with f that consumes also the entry index
 */
export declare function filterWithIndex<A, B extends A>(refinementWithIndex: RefinementWithIndex<string, A, B>): (fa: Dictionary<A>) => Dictionary<B>;
export declare function filterWithIndex<A>(predicateWithIndex: PredicateWithIndex<string, A>): (fa: Dictionary<A>) => Dictionary<A>;
/**
 * Filter the record entries with f that consumes also the entry index
 */
export declare function filterWithIndex_<A, B extends A>(fa: Dictionary<A>, refinementWithIndex: RefinementWithIndex<string, A, B>): Dictionary<B>;
export declare function filterWithIndex_<A>(fa: Dictionary<A>, predicateWithIndex: PredicateWithIndex<string, A>): Dictionary<A>;
/**
 * Checks a predicate against all the record entries
 */
export declare function every<A>(predicate: Predicate<A>): (r: Dictionary<A>) => boolean;
/**
 * Checks a predicate against all the record entries
 */
export declare function every_<A>(r: Dictionary<A>, predicate: Predicate<A>): boolean;
/**
 * Checks a predicate against some of the record entries
 */
export declare function some<A>(predicate: (a: A) => boolean): (r: Dictionary<A>) => boolean;
/**
 * Checks a predicate against some of the record entries
 */
export declare function some_<A>(r: Dictionary<A>, predicate: (a: A) => boolean): boolean;
/**
 * Drop the None entries
 */
export declare const compact: <A>(fa: Dictionary<O.Option<A>>) => Dictionary<A>;
/**
 * Separate the record entries
 */
export declare const separate: <A, B>(fa: Dictionary<Either<A, B>>) => Tp.Tuple<[Dictionary<A>, Dictionary<B>]>;
/**
 * Filter record entries according to a predicate
 */
export declare const filter: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Dictionary<A>) => Dictionary<B>;
    <A>(predicate: Predicate<A>): (fa: Dictionary<A>) => Dictionary<A>;
};
/**
 * Filter record entries according to a predicate
 */
export declare const filter_: {
    <A, B extends A>(fa: Dictionary<A>, refinement: Refinement<A, B>): Dictionary<B>;
    <A>(fa: Dictionary<A>, predicate: Predicate<A>): Dictionary<A>;
};
/**
 * Filter & map record entries according to a predicate
 */
export declare const filterMap: <A, B>(f: (a: A) => O.Option<B>) => (fa: Dictionary<A>) => Dictionary<B>;
/**
 * Filter & map record entries according to a predicate
 */
export declare const filterMap_: <A, B>(fa: Dictionary<A>, f: (a: A) => O.Option<B>) => Dictionary<B>;
/**
 * Partition record entries according to a predicate
 */
export declare const partition: {
    <A, B extends A>(refinement: Refinement<A, B>): (fa: Dictionary<A>) => Tp.Tuple<[Dictionary<A>, Dictionary<B>]>;
    <A>(predicate: Predicate<A>): <K extends string>(fa: Dictionary<A>) => Tp.Tuple<[Dictionary<A>, Dictionary<A>]>;
};
/**
 * Partition record entries according to a predicate
 */
export declare const partition_: {
    <A, B extends A>(fa: Dictionary<A>, refinement: Refinement<A, B>): Tp.Tuple<[
        Dictionary<A>,
        Dictionary<B>
    ]>;
    <A>(fa: Dictionary<A>, predicate: Predicate<A>): Tp.Tuple<[
        Dictionary<A>,
        Dictionary<A>
    ]>;
};
/**
 * Partition & map record entries
 */
export declare const partitionMap: {
    <A, B, C>(f: (a: A) => Either<B, C>): (fa: Dictionary<A>) => Tp.Tuple<[Dictionary<B>, Dictionary<C>]>;
    <A, B, C>(f: (a: A) => Either<B, C>): (fa: Dictionary<A>) => Tp.Tuple<[Dictionary<B>, Dictionary<C>]>;
};
/**
 * Partition & map record entries
 */
export declare const partitionMap_: <A, B, C>(fa: Dictionary<A>, f: (a: A) => Either<B, C>) => Tp.Tuple<[Dictionary<B>, Dictionary<C>]>;
/**
 * Reduce record entries
 */
export declare const reduce: <A, B>(b: B, f: (b: B, a: A) => B) => (fa: Dictionary<A>) => B;
/**
 * Reduce record entries
 */
export declare const reduce_: <A, B>(fa: Dictionary<A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * Reduce record entries in inverted order
 */
export declare const reduceRight: <A, B>(b: B, f: (a: A, b: B) => B) => (fa: Dictionary<A>) => B;
/**
 * Reduce record entries in inverted order
 */
export declare const reduceRight_: <A, B>(fa: Readonly<MutableRecord<string, A>>, b: B, f: (a: A, b: B) => B) => B;
/**
 * Converts a record into an array of [key, value]
 */
export declare const toArray: <A>(r: Dictionary<A>) => ReadonlyArray<Tp.Tuple<[string, A]>>;
/**
 * Converts an array of [key, value] into a record
 */
export declare const fromArray: <V>(_: readonly Tp.Tuple<[string, V]>[]) => Dictionary<V>;
//# sourceMappingURL=index.d.ts.map