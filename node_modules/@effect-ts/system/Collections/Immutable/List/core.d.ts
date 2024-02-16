import type { Either } from "../../../Either/index.js";
import * as O from "../../../Option/index.js";
import type { Ord } from "../../../Ord/index.js";
import * as St from "../../../Structural/index.js";
import * as Tp from "../Tuple/index.js";
export declare type Sizes = number[] | undefined;
export declare class Node {
    sizes: Sizes;
    array: any[];
    constructor(sizes: Sizes, array: any[]);
}
/**
 * Represents a list of elements.
 */
export declare class List<A> implements Iterable<A>, St.HasEquals, St.HasHash {
    readonly bits: number;
    readonly offset: number;
    readonly length: number;
    readonly prefix: A[];
    readonly root: Node | undefined;
    readonly suffix: A[];
    constructor(bits: number, offset: number, length: number, prefix: A[], root: Node | undefined, suffix: A[]);
    [Symbol.iterator](): Iterator<A>;
    toJSON(): readonly A[];
    [St.equalsSym](that: unknown): boolean;
    get [St.hashSym](): number;
}
export declare type MutableList<A> = {
    -readonly [K in keyof List<A>]: List<A>[K];
} & {
    [Symbol.iterator]: () => Iterator<A>;
    "@@mutable": true;
};
/**
 * Returns an iterable that iterates backwards over the given list.
 *
 * @complexity O(1)
 */
export declare function backwards<A>(l: List<A>): Iterable<A>;
export declare function emptyPushable<A>(): MutableList<A>;
/** Appends the value to the list by _mutating_ the list and its content. */
export declare function push_<A>(l: MutableList<A>, value: A): MutableList<A>;
/**
 * Creates a list of the given elements.
 *
 * @complexity O(n)
 */
export declare function list<A>(...elements: A[]): List<A>;
/**
 * Creates an empty list.
 *
 * @complexity O(1)
 */
export declare function empty<A = any>(): List<A>;
/**
 * Takes a single arguments and returns a singleton list that contains it.
 *
 * @complexity O(1)
 */
export declare function of<A>(a: A): List<A>;
/**
 * Takes two arguments and returns a list that contains them.
 *
 * @complexity O(1)
 */
export declare function pair<A>(second: A): (first: A) => List<A>;
/**
 * Takes two arguments and returns a list that contains them.
 *
 * @complexity O(1)
 */
export declare function pair_<A>(first: A, second: A): List<A>;
/**
 * Converts an array, an array-like, or an iterable into a list.
 *
 * @complexity O(n)
 */
export declare function from<A>(sequence: A[] | ArrayLike<A> | Iterable<A>): List<A>;
/**
 * Returns a list of numbers between an inclusive lower bound and an exclusive upper bound.
 *
 * @complexity O(n)
 */
export declare function range(end: number): (start: number) => List<number>;
/**
 * Returns a list of numbers between an inclusive lower bound and an exclusive upper bound.
 *
 * @complexity O(n)
 */
export declare function range_(start: number, end: number): List<number>;
/**
 * Returns a list of a given length that contains the specified value
 * in all positions.
 *
 * @complexity O(n)
 */
export declare function repeat(times: number): <A>(value: A) => List<A>;
/**
 * Returns a list of a given length that contains the specified value
 * in all positions.
 *
 * @complexity O(n)
 */
export declare function repeat_<A>(value: A, times: number): List<A>;
/**
 * Generates a new list by calling a function with the current index
 * `n` times.
 *
 * @complexity O(n)
 */
export declare function times(times: number): <A>(func: (index: number) => A) => List<A>;
/**
 * Generates a new list by calling a function with the current index
 * `n` times.
 *
 * @complexity O(n)
 */
export declare function times_<A>(func: (index: number) => A, times: number): List<A>;
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */
export declare function unsafeNth_<A>(l: List<A>, index: number): A | undefined;
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */
export declare function unsafeNth(index: number): <A>(l: List<A>) => A | undefined;
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */
export declare function nth_<A>(l: List<A>, index: number): O.Option<A>;
/**
 * Gets the nth element of the list. If `n` is out of bounds
 * `undefined` is returned.
 *
 * @complexity O(log(n))
 */
export declare function nth(index: number): <A>(l: List<A>) => O.Option<A>;
/**
 * Prepends an element to the front of a list and returns the new list.
 *
 * @complexity O(1)
 */
export declare function prepend_<A>(l: List<A>, value: A): List<A>;
/**
 * Prepends an element to the front of a list and returns the new list.
 *
 * @complexity O(1)
 */
export declare function prepend<A>(value: A): (l: List<A>) => List<A>;
/**
 * Appends an element to the end of a list and returns the new list.
 *
 * @complexity O(n)
 */
export declare function append_<A>(l: List<A>, value: A): List<A>;
/**
 * Appends an element to the end of a list and returns the new list.
 *
 * @complexity O(n)
 */
export declare function append<A>(value: A): (l: List<A>) => List<A>;
/**
 * Gets the length of a list.
 *
 * @complexity `O(1)`
 */
export declare function size(l: List<any>): number;
/**
 * Returns the first element of the list. If the list is empty the
 * function returns undefined.
 *
 * @complexity O(1)
 */
export declare function unsafeFirst<A>(l: List<A>): A | undefined;
/**
 * Returns the first element of the list. If the list is empty the
 * function returns undefined.
 *
 * @complexity O(1)
 */
export declare function first<A>(l: List<A>): O.Option<A>;
/**
 * Returns the last element of the list. If the list is empty the
 * function returns `undefined`.
 *
 * @complexity O(1)
 */
export declare function unsafeLast<A>(l: List<A>): A | undefined;
/**
 * Returns the last element of the list. If the list is empty the
 * function returns `undefined`.
 *
 * @complexity O(1)
 */
export declare function last<A>(l: List<A>): O.Option<A>;
/**
 * Applies a function to each element in the given list and returns a
 * new list of the values that the function return.
 *
 * @complexity O(n)
 */
export declare function map_<A, B>(l: List<A>, f: (a: A) => B): List<B>;
/**
 * Applies a function to each element in the given list and returns a
 * new list of the values that the function return.
 *
 * @complexity O(n)
 */
export declare function map<A, B>(f: (a: A) => B): (l: List<A>) => List<B>;
/**
 * Extracts the specified property from each object in the list.
 */
export declare function pluck_<A, K extends keyof A>(l: List<A>, key: K): List<A[K]>;
/**
 * Extracts the specified property from each object in the list.
 */
export declare function pluck<A, K extends keyof A>(key: K): (l: List<A>) => List<A[K]>;
/**
 * Folds a function over a list. Left-associative.
 */
export declare function reduce_<A, B>(l: List<A>, initial: B, f: (acc: B, value: A) => B): B;
/**
 * Folds a function over a list. Left-associative.
 */
export declare function reduce<A, B>(initial: B, f: (acc: B, value: A) => B): (l: List<A>) => B;
/**
 * Folds a function over a list from left to right while collecting
 * all the intermediate steps in a resulting list.
 */
export declare function scan_<A, B>(l: List<A>, initial: B, f: (acc: B, value: A) => B): List<B>;
/**
 * Folds a function over a list from left to right while collecting
 * all the intermediate steps in a resulting list.
 */
export declare function scan<A, B>(initial: B, f: (acc: B, value: A) => B): (l: List<A>) => List<B>;
/**
 * Invokes a given callback for each element in the list from left to
 * right. Returns `undefined`.
 *
 * This function is very similar to map. It should be used instead of
 * `map` when the mapping function has side-effects. Whereas `map`
 * constructs a new list `forEach` merely returns `undefined`. This
 * makes `forEach` faster when the new list is unneeded.
 *
 * @complexity O(n)
 */
export declare function forEach_<A>(l: List<A>, callback: (a: A) => void): void;
/**
 * Invokes a given callback for each element in the list from left to
 * right. Returns `undefined`.
 *
 * This function is very similar to map. It should be used instead of
 * `map` when the mapping function has side-effects. Whereas `map`
 * constructs a new list `forEach` merely returns `undefined`. This
 * makes `forEach` faster when the new list is unneeded.
 *
 * @complexity O(n)
 */
export declare function forEach<A>(callback: (a: A) => void): (l: List<A>) => void;
/**
 * Returns a new list that only contains the elements of the original
 * list for which the predicate returns `true`.
 *
 * @complexity O(n)
 */
export declare function filter_<A, B extends A>(l: List<A>, predicate: (a: A) => a is B): List<B>;
export declare function filter_<A>(l: List<A>, predicate: (a: A) => boolean): List<A>;
/**
 * Returns a new list that only contains the elements of the original
 * list for which the predicate returns `true`.
 *
 * @complexity O(n)
 */
export declare function filter<A, B extends A>(predicate: (a: A) => a is B): (l: List<A>) => List<B>;
export declare function filter<A>(predicate: (a: A) => boolean): (l: List<A>) => List<A>;
/**
 * Returns a new list that only contains the elements of the original
 * list for which the f returns `Some`.
 *
 * @complexity O(n)
 */
export declare function filterMap_<A, B>(l: List<A>, f: (a: A) => O.Option<B>): List<B>;
/**
 * Returns a new list that only contains the elements of the original
 * list for which the f returns `Some`.
 *
 * @complexity O(n)
 */
export declare function filterMap<A, B>(f: (a: A) => O.Option<B>): (l: List<A>) => List<B>;
/**
 * Filter out optional values
 */
export declare function compact<A>(fa: List<O.Option<A>>): List<A>;
/**
 * Returns a new list that only contains the elements of the original
 * list for which the predicate returns `false`.
 *
 * @complexity O(n)
 */
export declare function filterNot_<A>(l: List<A>, predicate: (a: A) => boolean): List<A>;
/**
 * Returns a new list that only contains the elements of the original
 * list for which the predicate returns `false`.
 *
 * @complexity O(n)
 */
export declare function filterNot<A>(predicate: (a: A) => boolean): (l: List<A>) => List<A>;
/**
 * Splits the list into two lists. One list that contains all the
 * values for which the predicate returns `true` and one containing
 * the values for which it returns `false`.
 *
 * @complexity O(n)
 */
export declare function partition_<A, B extends A>(l: List<A>, predicate: (a: A) => a is B): Tp.Tuple<[List<B>, List<Exclude<A, B>>]>;
export declare function partition_<A>(l: List<A>, predicate: (a: A) => boolean): Tp.Tuple<[List<A>, List<A>]>;
/**
 * Splits the list into two lists. One list that contains all the
 * values for which the predicate returns `true` and one containing
 * the values for which it returns `false`.
 *
 * @complexity O(n)
 */
export declare function partition<A, B extends A>(predicate: (a: A) => a is B): (l: List<A>) => Tp.Tuple<[List<B>, List<Exclude<A, B>>]>;
export declare function partition<A>(predicate: (a: A) => boolean): (l: List<A>) => Tp.Tuple<[List<A>, List<A>]>;
/**
 * Splits the list into two lists. One list that contains the lefts
 * and one contains the rights
 *
 * @complexity O(n)
 */
export declare function partitionMap_<A, B, C>(l: List<A>, f: (_: A) => Either<B, C>): Tp.Tuple<[List<B>, List<C>]>;
/**
 * Splits the list into two lists. One list that contains the lefts
 * and one contains the rights
 *
 * @complexity O(n)
 */
export declare function partitionMap<A, B, C>(f: (_: A) => Either<B, C>): (l: List<A>) => Tp.Tuple<[List<B>, List<C>]>;
/**
 * Splits the list into two lists. One list that contains the lefts
 * and one contains the rights
 *
 * @complexity O(n)
 */
export declare function separate<B, C>(l: List<Either<B, C>>): Tp.Tuple<[List<B>, List<C>]>;
/**
 * Concats the strings in the list separated by a specified separator.
 */
export declare function join_(l: List<string>, separator: string): string;
/**
 * Concats the strings in the list separated by a specified separator.
 */
export declare function join(separator: string): (l: List<string>) => string;
/**
 * Folds a function over a list. Right-associative.
 *
 * @complexity O(n)
 */
export declare function reduceRight_<A, B>(l: List<A>, initial: B, f: (value: A, acc: B) => B): B;
/**
 * Folds a function over a list. Right-associative.
 *
 * @complexity O(n)
 */
export declare function reduceRight<A, B>(initial: B, f: (value: A, acc: B) => B): (l: List<A>) => B;
/**
 * Applies a list of functions to a list of values.
 */
export declare function ap_<A, B>(listF: List<(a: A) => B>, l: List<A>): List<B>;
/**
 * Applies a list of functions to a list of values.
 */
export declare function ap<A, B>(l: List<A>): (listF: List<(a: A) => B>) => List<B>;
/**
 * Flattens a list of lists into a list. Note that this function does
 * not flatten recursively. It removes one level of nesting only.
 *
 * @complexity O(n * log(m)), where n is the length of the outer list and m the length of the inner lists.
 */
export declare function flatten<A>(nested: List<List<A>>): List<A>;
/**
 * Maps a function over a list and concatenates all the resulting
 * lists together.
 */
export declare function chain_<A, B>(l: List<A>, f: (a: A) => List<B>): List<B>;
/**
 * Maps a function over a list and concatenates all the resulting
 * lists together.
 */
export declare function chain<A, B>(f: (a: A) => List<B>): (l: List<A>) => List<B>;
export declare function reduceWhile_<A, B>(l: List<A>, initial: B, predicate: (acc: B, value: A) => boolean, f: (acc: B, value: A) => B): B;
export declare function reduceWhile<A, B>(initial: B, predicate: (acc: B, value: A) => boolean, f: (acc: B, value: A) => B): (l: List<A>) => B;
/**
 * Returns `true` if and only if the predicate function returns `true`
 * for all elements in the given list.
 *
 * @complexity O(n)
 */
export declare function every_<A>(l: List<A>, predicate: (a: A) => boolean): boolean;
/**
 * Returns `true` if and only if the predicate function returns `true`
 * for all elements in the given list.
 *
 * @complexity O(n)
 */
export declare function every<A>(predicate: (a: A) => boolean): (l: List<A>) => boolean;
/**
 * Returns true if and only if there exists an element in the list for
 * which the predicate returns true.
 *
 * @complexity O(n)
 */
export declare function some_<A>(l: List<A>, predicate: (a: A) => boolean): boolean;
/**
 * Returns true if and only if there exists an element in the list for
 * which the predicate returns true.
 *
 * @complexity O(n)
 */
export declare function some<A>(predicate: (a: A) => boolean): (l: List<A>) => boolean;
/**
 * Returns `true` if and only if the predicate function returns
 * `false` for every element in the given list.
 *
 * @complexity O(n)
 */
export declare function none_<A>(l: List<A>, predicate: (a: A) => boolean): boolean;
/**
 * Returns `true` if and only if the predicate function returns
 * `false` for every element in the given list.
 *
 * @complexity O(n)
 */
export declare function none<A>(predicate: (a: A) => boolean): (l: List<A>) => boolean;
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function unsafeFind_<A>(l: List<A>, predicate: (a: A) => boolean): A | undefined;
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function unsafeFind<A>(predicate: (a: A) => boolean): (l: List<A>) => A | undefined;
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function find_<A>(l: List<A>, predicate: (a: A) => boolean): O.Option<A>;
/**
 * Returns the _first_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function find<A>(predicate: (a: A) => boolean): (l: List<A>) => O.Option<A>;
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function unsafeFindLast_<A>(l: List<A>, predicate: (a: A) => boolean): A | undefined;
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function unsafeFindLast<A>(predicate: (a: A) => boolean): (l: List<A>) => A | undefined;
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function findLast_<A>(l: List<A>, predicate: (a: A) => boolean): O.Option<A>;
/**
 * Returns the _last_ element for which the predicate returns `true`.
 * If no such element is found the function returns `undefined`.
 *
 * @complexity O(n)
 */
export declare function findLast<A>(predicate: (a: A) => boolean): (l: List<A>) => O.Option<A>;
/**
 * Returns the index of the _first_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */
export declare function indexOf_<A>(l: List<A>, element: A): number;
/**
 * Returns the index of the _first_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */
export declare function indexOf<A>(element: A): (l: List<A>) => number;
/**
 * Returns the index of the _last_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */
export declare function lastIndexOf_<A>(l: List<A>, element: A): number;
/**
 * Returns the index of the _last_ element in the list that is equal
 * to the given element. If no such element is found `-1` is returned.
 *
 * @complexity O(n)
 */
export declare function lastIndexOf<A>(element: A): (l: List<A>) => number;
/**
 * Returns the index of the `first` element for which the predicate
 * returns true. If no such element is found the function returns
 * `-1`.
 *
 * @complexity O(n)
 */
export declare function findIndex_<A>(l: List<A>, predicate: (a: A) => boolean): number;
/**
 * Returns the index of the `first` element for which the predicate
 * returns true. If no such element is found the function returns
 * `-1`.
 *
 * @complexity O(n)
 */
export declare function findIndex<A>(predicate: (a: A) => boolean): (l: List<A>) => number;
/**
 * Returns `true` if the list contains the specified element.
 * Otherwise it returns `false`.
 *
 * @complexity O(n)
 */
export declare function contains_<A>(l: List<A>, element: A): boolean;
/**
 * Returns `true` if the list contains the specified element.
 * Otherwise it returns `false`.
 *
 * @complexity O(n)
 */
export declare function contains<A>(element: A): (l: List<A>) => boolean;
/**
 * Returns true if the two lists are equivalent.
 *
 * @complexity O(n)
 */
export declare function equals_<A>(l1: List<A>, l2: List<A>): boolean;
/**
 * Returns true if the two lists are equivalent.
 *
 * @complexity O(n)
 */
export declare function equals<A>(l2: List<A>): (l1: List<A>) => boolean;
/**
 * Returns true if the two lists are equivalent when comparing each
 * pair of elements with the given comparison function.
 *
 * @complexity O(n)
 */
export declare function equalsWith_<A>(l1: List<A>, l2: List<A>, f: (a: A, b: A) => boolean): boolean;
/**
 * Returns true if the two lists are equivalent when comparing each
 * pair of elements with the given comparison function.
 *
 * @complexity O(n)
 */
export declare function equalsWith<A>(l2: List<A>, f: (a: A, b: A) => boolean): (l1: List<A>) => boolean;
/**
 * Concatenates two lists.
 *
 * @complexity O(log(n))
 */
export declare function concat_<A>(left: List<A>, right: List<A>): List<A>;
/**
 * Concatenates two lists.
 *
 * @complexity O(log(n))
 */
export declare function concat<A>(right: List<A>): (left: List<A>) => List<A>;
/**
 * Returns a list that has the entry specified by the index replaced with the given value.
 *
 * If the index is out of bounds the given list is returned unchanged.
 *
 * @complexity O(log(n))
 */
export declare function update_<A>(l: List<A>, index: number, a: A): List<A>;
/**
 * Returns a list that has the entry specified by the index replaced with the given value.
 *
 * If the index is out of bounds the given list is returned unchanged.
 *
 * @complexity O(log(n))
 */
export declare function update<A>(index: number, a: A): (l: List<A>) => List<A>;
/**
 * Returns a list that has the entry specified by the index replaced with
 * the value returned by applying the function to the value.
 *
 * If the index is out of bounds the given list is
 * returned unchanged.
 *
 * @complexity `O(log(n))`
 */
export declare function adjust_<A>(l: List<A>, index: number, f: (a: A) => A): List<A>;
/**
 * Returns a list that has the entry specified by the index replaced with
 * the value returned by applying the function to the value.
 *
 * If the index is out of bounds the given list is
 * returned unchanged.
 *
 * @complexity `O(log(n))`
 */
export declare function adjust<A>(index: number, f: (a: A) => A): (l: List<A>) => List<A>;
/**
 * Returns a slice of a list. Elements are removed from the beginning and
 * end. Both the indices can be negative in which case they will count
 * from the right end of the list.
 *
 * @complexity `O(log(n))`
 */
export declare function slice_<A>(l: List<A>, from: number, to: number): List<A>;
/**
 * Returns a slice of a list. Elements are removed from the beginning and
 * end. Both the indices can be negative in which case they will count
 * from the right end of the list.
 *
 * @complexity `O(log(n))`
 */
export declare function slice(from: number, to: number): <A>(l: List<A>) => List<A>;
/**
 * Takes the first `n` elements from a list and returns them in a new list.
 *
 * @complexity `O(log(n))`
 */
export declare function take_<A>(l: List<A>, n: number): List<A>;
/**
 * Takes the first `n` elements from a list and returns them in a new list.
 *
 * @complexity `O(log(n))`
 */
export declare function take(n: number): <A>(l: List<A>) => List<A>;
/**
 * Takes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements satisfying
 * the predicate.
 */
export declare function takeWhile_<A>(l: List<A>, predicate: (a: A) => boolean): List<A>;
/**
 * Takes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements satisfying
 * the predicate.
 */
export declare function takeWhile<A>(predicate: (a: A) => boolean): (l: List<A>) => List<A>;
/**
 * Takes the last elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */
export declare function takeLastWhile_<A>(l: List<A>, predicate: (a: A) => boolean): List<A>;
/**
 * Takes the last elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */
export declare function takeLastWhile<A>(predicate: (a: A) => boolean): (l: List<A>) => List<A>;
/**
 * Removes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */
export declare function dropWhile_<A>(l: List<A>, predicate: (a: A) => boolean): List<A>;
/**
 * Removes the first elements in the list for which the predicate returns
 * `true`.
 *
 * @complexity `O(k + log(n))` where `k` is the number of elements
 * satisfying the predicate.
 */
export declare function dropWhile<A>(predicate: (a: A) => boolean): (l: List<A>) => List<A>;
/**
 * Returns a new list without repeated elements.
 *
 * @complexity `O(n)`
 */
export declare function dropRepeats<A>(l: List<A>): List<A>;
/**
 * Returns a new list without repeated elements by using the given
 * function to determine when elements are equal.
 *
 * @complexity `O(n)`
 */
export declare function dropRepeatsWith_<A>(l: List<A>, predicate: (a: A, b: A) => boolean): List<A>;
/**
 * Returns a new list without repeated elements by using the given
 * function to determine when elements are equal.
 *
 * @complexity `O(n)`
 */
export declare function dropRepeatsWith<A>(predicate: (a: A, b: A) => boolean): (l: List<A>) => List<A>;
/**
 * Takes the last `n` elements from a list and returns them in a new
 * list.
 *
 * @complexity `O(log(n))`
 */
export declare function takeLast_<A>(l: List<A>, n: number): List<A>;
/**
 * Takes the last `n` elements from a list and returns them in a new
 * list.
 *
 * @complexity `O(log(n))`
 */
export declare function takeLast<A>(n: number): (l: List<A>) => List<A>;
/**
 * Splits a list at the given index and return the two sides in a pair.
 * The left side will contain all elements before but not including the
 * element at the given index. The right side contains the element at the
 * index and all elements after it.
 *
 * @complexity `O(log(n))`
 */
export declare function splitAt_<A>(l: List<A>, index: number): [List<A>, List<A>];
/**
 * Splits a list at the given index and return the two sides in a pair.
 * The left side will contain all elements before but not including the
 * element at the given index. The right side contains the element at the
 * index and all elements after it.
 *
 * @complexity `O(log(n))`
 */
export declare function splitAt(index: number): <A>(l: List<A>) => [List<A>, List<A>];
/**
 * Splits a list at the first element in the list for which the given
 * predicate returns `true`.
 *
 * @complexity `O(n)`
 */
export declare function splitWhen_<A>(l: List<A>, predicate: (a: A) => boolean): [List<A>, List<A>];
/**
 * Splits a list at the first element in the list for which the given
 * predicate returns `true`.
 *
 * @complexity `O(n)`
 */
export declare function splitWhen<A>(predicate: (a: A) => boolean): (l: List<A>) => [List<A>, List<A>];
/**
 * Splits the list into chunks of the given size.
 */
export declare function splitEvery_<A>(l: List<A>, size: number): List<List<A>>;
/**
 * Splits the list into chunks of the given size.
 */
export declare function splitEvery(size: number): <A>(l: List<A>) => List<List<A>>;
/**
 * Takes an index, a number of elements to remove and a list. Returns a
 * new list with the given amount of elements removed from the specified
 * index.
 *
 * @complexity `O(log(n))`
 */
export declare function remove_<A>(l: List<A>, from: number, amount: number): List<A>;
/**
 * Takes an index, a number of elements to remove and a list. Returns a
 * new list with the given amount of elements removed from the specified
 * index.
 *
 * @complexity `O(log(n))`
 */
export declare function remove(from: number, amount: number): <A>(l: List<A>) => List<A>;
/**
 * Returns a new list without the first `n` elements.
 *
 * @complexity `O(log(n))`
 */
export declare function drop_<A>(l: List<A>, n: number): List<A>;
/**
 * Returns a new list without the first `n` elements.
 *
 * @complexity `O(log(n))`
 */
export declare function drop(n: number): <A>(l: List<A>) => List<A>;
/**
 * Returns a new list without the last `n` elements.
 *
 * @complexity `O(log(n))`
 */
export declare function dropLast_<A>(l: List<A>, n: number): List<A>;
/**
 * Returns a new list without the last `n` elements.
 *
 * @complexity `O(log(n))`
 */
export declare function dropLast<A>(n: number): (l: List<A>) => List<A>;
/**
 * Returns a new list with the last element removed. If the list is
 * empty the empty list is returned.
 *
 * @complexity `O(1)`
 */
export declare function pop<A>(l: List<A>): List<A>;
/**
 * Returns a new list with the first element removed. If the list is
 * empty the empty list is returned.
 *
 * @complexity `O(1)`
 */
export declare function tail<A>(l: List<A>): List<A>;
/**
 * Converts a list into an array.
 *
 * @complexity `O(n)`
 */
export declare function toArray<A>(l: List<A>): readonly A[];
/**
 * Inserts the given element at the given index in the list.
 *
 * @complexity O(log(n))
 */
export declare function insert_<A>(l: List<A>, index: number, element: A): List<A>;
/**
 * Inserts the given element at the given index in the list.
 *
 * @complexity O(log(n))
 */
export declare function insert<A>(index: number, element: A): (l: List<A>) => List<A>;
/**
 * Inserts the given list of elements at the given index in the list.
 *
 * @complexity `O(log(n))`
 */
export declare function insertAll_<A>(l: List<A>, index: number, elements: List<A>): List<A>;
/**
 * Inserts the given list of elements at the given index in the list.
 *
 * @complexity `O(log(n))`
 */
export declare function insertAll<A>(index: number, elements: List<A>): (l: List<A>) => List<A>;
/**
 * Reverses a list.
 * @complexity O(n)
 */
export declare function reverse<A>(l: List<A>): List<A>;
/**
 * Returns `true` if the given argument is a list and `false`
 * otherwise.
 *
 * @complexity O(1)
 */
export declare function isList<A>(l: any): l is List<A>;
/**
 * Iterate over two lists in parallel and collect the pairs.
 *
 * @complexity `O(log(n))`, where `n` is the length of the smallest
 * list.
 */
export declare function zip_<A, B>(as: List<A>, bs: List<B>): List<Tp.Tuple<[A, B]>>;
/**
 * Iterate over two lists in parallel and collect the pairs.
 *
 * @complexity `O(log(n))`, where `n` is the length of the smallest
 * list.
 */
export declare function zip<B>(bs: List<B>): <A>(as: List<A>) => List<Tp.Tuple<[A, B]>>;
/**
 * This is like mapping over two lists at the same time. The two lists
 * are iterated over in parallel and each pair of elements is passed
 * to the function. The returned values are assembled into a new list.
 *
 * The shortest list determines the size of the result.
 *
 * @complexity `O(log(n))` where `n` is the length of the smallest
 * list.
 */
export declare function zipWith_<A, B, C>(as: List<A>, bs: List<B>, f: (a: A, b: B) => C): List<C>;
/**
 * This is like mapping over two lists at the same time. The two lists
 * are iterated over in parallel and each pair of elements is passed
 * to the function. The returned values are assembled into a new list.
 *
 * The shortest list determines the size of the result.
 *
 * @complexity `O(log(n))` where `n` is the length of the smallest
 * list.
 */
export declare function zipWith<A, B, C>(bs: List<B>, f: (a: A, b: B) => C): (as: List<A>) => List<C>;
/**
 * Sort the given list by comparing values using the given function.
 * The function receieves two values and should return `-1` if the
 * first value is stricty larger than the second, `0` is they are
 * equal and `1` if the first values is strictly smaller than the
 * second.
 *
 * @complexity O(n * log(n))
 */
export declare function sortWith_<A>(l: List<A>, ord: Ord<A>): List<A>;
/**
 * Sort the given list by comparing values using the given function.
 * The function receieves two values and should return `-1` if the
 * first value is stricty larger than the second, `0` is they are
 * equal and `1` if the first values is strictly smaller than the
 * second.
 *
 * @complexity O(n * log(n))
 */
export declare function sortWith<A>(ord: Ord<A>): (l: List<A>) => List<A>;
/**
 * Returns a list of lists where each sublist's elements are all
 * equal.
 */
export declare function group<A>(l: List<A>): List<List<A>>;
/**
 * Returns a list of lists where each sublist's elements are pairwise
 * equal based on the given comparison function.
 *
 * Note that only adjacent elements are compared for equality. If all
 * equal elements should be grouped together the list should be sorted
 * before grouping.
 */
export declare function groupWith_<A>(l: List<A>, f: (a: A, b: A) => boolean): List<List<A>>;
/**
 * Returns a list of lists where each sublist's elements are pairwise
 * equal based on the given comparison function.
 *
 * Note that only adjacent elements are compared for equality. If all
 * equal elements should be grouped together the list should be sorted
 * before grouping.
 */
export declare function groupWith<A>(f: (a: A, b: A) => boolean): (l: List<A>) => List<List<A>>;
/**
 * Inserts a separator between each element in a list.
 */
export declare function intersperse_<A>(l: List<A>, separator: A): List<A>;
/**
 * Inserts a separator between each element in a list.
 */
export declare function intersperse<A>(separator: A): (l: List<A>) => List<A>;
/**
 * Returns `true` if the given list is empty and `false` otherwise.
 */
export declare function isEmpty(l: List<any>): boolean;
/**
 * Builder
 */
export declare function builder<A>(): ListBuilder<A>;
export declare class ListBuilder<A> {
    private chunk;
    constructor(chunk: MutableList<A>);
    append(a: A): ListBuilder<A>;
    build(): MutableList<A>;
}
//# sourceMappingURL=core.d.ts.map