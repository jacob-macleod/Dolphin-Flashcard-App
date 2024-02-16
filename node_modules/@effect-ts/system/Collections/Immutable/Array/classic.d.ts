import type { Either } from "../../../Either/core.js";
import type { Predicate, Refinement } from "../../../Function/core.js";
import type { Option } from "../../../Option/index.js";
import type { Dictionary } from "../Dictionary/index.js";
import type { NonEmptyArray } from "../NonEmptyArray/index.js";
import * as Tp from "../Tuple/index.js";
import * as C from "./core.js";
/**
 * Classic Applicative's ap
 */
export declare function ap<A>(fa: C.Array<A>): <B>(fab: C.Array<(a: A) => B>) => C.Array<B>;
/**
 * Classic Applicative's ap
 */
export declare function ap_<A, B>(fab: C.Array<(a: A) => B>, fa: C.Array<A>): C.Array<B>;
/**
 * Array comprehension
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * ```ts
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 * ```
 */
export declare function comprehension<A, B, C, D, R>(input: readonly [Array<A>, C.Array<B>, C.Array<C>, C.Array<D>], f: (a: A, b: B, c: C, d: D) => R, g?: (a: A, b: B, c: C, d: D) => boolean): C.Array<R>;
export declare function comprehension<A, B, C, R>(input: readonly [C.Array<A>, C.Array<B>, C.Array<C>], f: (a: A, b: B, c: C) => R, g?: (a: A, b: B, c: C) => boolean): C.Array<R>;
export declare function comprehension<A, R>(input: readonly [C.Array<A>], f: (a: A) => R, g?: (a: A) => boolean): C.Array<R>;
export declare function comprehension<A, B, R>(input: readonly [C.Array<A>, C.Array<B>], f: (a: A, b: B) => R, g?: (a: A, b: B) => boolean): C.Array<R>;
export declare function comprehension<A, R>(input: readonly [C.Array<A>], f: (a: A) => boolean, g?: (a: A) => R): C.Array<R>;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * ```ts
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 * ```
 */
export declare function deleteAt(i: number): <A>(as: C.Array<A>) => Option<C.Array<A>>;
/**
 * Delete the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 */
export declare function deleteAt_<A>(as: C.Array<A>, i: number): Option<C.Array<A>>;
/**
 * Array[A] => Array[Array[A]]
 */
export declare function duplicate<A>(ma: C.Array<A>): C.Array<C.Array<A>>;
/**
 * Extends calls f with all the progressive slices up to the current element's index,
 * and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */
export declare function extend<A, B>(f: (fa: C.Array<A>) => B): (ma: C.Array<A>) => C.Array<B>;
/**
 * Extends calls f with all the progressive slices up to the current element's index,
 * and uses the return value to construct the result array
 *
 * i.e: like map that also consumes all the elements up to `i`
 */
export declare function extend_<A, B>(ma: C.Array<A>, f: (fa: C.Array<A>) => B): C.Array<B>;
/**
 * Find the first element returned by an option based selector function
 *
 * ```ts
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 * ```
 */
export declare function findFirstMap<A, B>(f: (a: A) => Option<B>): (as: C.Array<A>) => Option<B>;
/**
 * Find the first element returned by an option based selector function
 */
export declare function findFirstMap_<A, B>(as: C.Array<A>, f: (a: A) => Option<B>): Option<B>;
/**
 * Find the first element returned by an option based selector function
 */
export declare function findFirstMapWithIndex_<A, B>(as: C.Array<A>, f: (i: number, a: A) => Option<B>): Option<B>;
/**
 * Find the first element returned by an option based selector function
 *
 * @ets_data_first findFirstMapWithIndex_
 */
export declare function findFirstMapWithIndex<A, B>(f: (i: number, a: A) => Option<B>): (as: C.Array<A>) => Option<B>;
/**
 * Find the last element returned by an option based selector function
 *
 * ```ts
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: Array<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 * ```
 */
export declare function findLastMap<A, B>(f: (a: A) => Option<B>): (as: C.Array<A>) => Option<B>;
/**
 * Find the last element returned by an option based selector function
 */
export declare function findLastMap_<A, B>(as: C.Array<A>, f: (a: A) => Option<B>): Option<B>;
/**
 * Break an array into its first element and remaining elements
 *
 * ```ts
 * const len: <A>(as: Array<A>) => number = foldLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 * ```
 */
export declare function foldLeft<A, B>(onNil: () => B, onCons: (head: A, tail: C.Array<A>) => B): (as: C.Array<A>) => B;
/**
 * Break an array into its first element and remaining elements
 */
export declare function foldLeft_<A, B>(as: C.Array<A>, onNil: () => B, onCons: (head: A, tail: C.Array<A>) => B): B;
/**
 * Break an array into its initial elements and the last element
 */
export declare function foldRight<A, B>(onNil: () => B, onCons: (init: Array<A>, last: A) => B): (as: Array<A>) => B;
/**
 * Break an array into its initial elements and the last element
 */
export declare function foldRight_<A, B>(as: Array<A>, onNil: () => B, onCons: (init: Array<A>, last: A) => B): B;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 *
 * ```
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 * ```
 */
export declare function init<A>(as: C.Array<A>): Option<C.Array<A>>;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * ```
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 * ```
 */
export declare function insertAt<A>(i: number, a: A): (as: C.Array<A>) => Option<C.Array<A>>;
/**
 * Insert an element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 */
export declare function insertAt_<A>(as: C.Array<A>, i: number, a: A): Option<C.Array<A>>;
/**
 * Inserts index i (non safe)
 */
export declare function unsafeInsertAt_<A>(as: C.Array<A>, i: number, a: A): C.Array<A>;
/**
 * Inserts index i (non safe)
 */
export declare function unsafeInsertAt<A>(i: number, a: A): (as: C.Array<A>) => C.Array<A>;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 *
 * ```ts
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 * ```
 */
export declare function updateAt<A>(i: number, a: A): (as: C.Array<A>) => Option<C.Array<A>>;
/**
 * Change the element at the specified index, creating a new array, or returning `None` if the index is out of bounds
 */
export declare function updateAt_<A>(as: C.Array<A>, i: number, a: A): Option<C.Array<A>>;
/**
 * Updates index i (non safe)
 */
export declare function unsafeUpdateAt_<A>(as: C.Array<A>, i: number, a: A): C.Array<A>;
/**
 * Updates index i (non safe)
 */
export declare function unsafeUpdateAt<A>(i: number, a: A): (as: C.Array<A>) => C.Array<A>;
/**
 * Extracts from an array of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * ```ts
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 * ```
 */
export declare function lefts<E, A>(as: C.Array<Either<E, A>>): C.Array<E>;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 *
 * ```ts
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 * ```
 */
export declare function modifyAt<A>(i: number, f: (a: A) => A): (as: C.Array<A>) => Option<C.Array<A>>;
/**
 * Apply a function to the element at the specified index, creating a new array, or returning `None` if the index is out
 * of bounds
 */
export declare function modifyAt_<A>(as: C.Array<A>, i: number, f: (a: A) => A): Option<C.Array<A>>;
/**
 * Extracts from an array of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 *
 * ```ts
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 * ```
 */
export declare function rights<E, A>(as: C.Array<Either<E, A>>): C.Array<A>;
/**
 * Rotate an array to the right by `n` steps
 *
 * ```ts
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * ```
 */
export declare function rotate(n: number): <A>(as: C.Array<A>) => C.Array<A>;
/**
 * Rotate an array to the right by `n` steps
 */
export declare function rotate_<A>(as: C.Array<A>, n: number): C.Array<A>;
/**
 * Same as `reduce` but it carries over the intermediate steps
 *
 * ```ts
 * import { scanLeft } from '@matechs/core/Array'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 * ```
 */
export declare function scanLeft<A, B>(b: B, f: (b: B, a: A) => B): (as: C.Array<A>) => C.Array<B>;
/**
 * Same as `reduce` but it carries over the intermediate steps
 */
export declare function scanLeft_<A, B>(as: C.Array<A>, b: B, f: (b: B, a: A) => B): C.Array<B>;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 *
 * ```ts
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 * ```
 */
export declare function scanRight<A, B>(b: B, f: (a: A, b: B) => B): (as: C.Array<A>) => C.Array<B>;
/**
 * Fold an array from the right, keeping all intermediate results instead of only the final result
 */
export declare function scanRight_<A, B>(as: C.Array<A>, b: B, f: (a: A, b: B) => B): C.Array<B>;
/**
 * Takes elements until the predicate returns positively
 */
export declare function takeUntil<A, B extends A>(predicate: Refinement<A, B>): (as: C.Array<A>) => C.Array<B>;
export declare function takeUntil<A>(predicate: Predicate<A>): (as: C.Array<A>) => C.Array<A>;
/**
 * Takes elements until the predicate returns positively
 */
export declare function takeUntil_<A, B extends A>(as: C.Array<A>, predicate: Refinement<A, B>): C.Array<B>;
export declare function takeUntil_<A>(as: C.Array<A>, predicate: Predicate<A>): C.Array<A>;
/**
 * Deletes index i (non safe)
 */
export declare function unsafeDeleteAt_<A>(as: C.Array<A>, i: number): C.Array<A>;
/**
 * Deletes index i (non safe)
 */
export declare function unsafeDeleteAt(i: number): <A>(as: C.Array<A>) => C.Array<A>;
/**
 * Separate Array
 */
export declare function separate<B, C>(fa: C.Array<Either<B, C>>): Tp.Tuple<[C.Array<B>, C.Array<C>]>;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 */
export declare function groupBy<A>(f: (a: A) => string): (as: C.Array<A>) => Dictionary<NonEmptyArray<A>>;
/**
 * Splits an array into sub-non-empty-arrays stored in an object, based on the result of calling a `string`-returning
 * function on each element, and grouping the results according to values returned
 */
export declare function groupBy_<A>(as: C.Array<A>, f: (a: A) => string): Dictionary<NonEmptyArray<A>>;
//# sourceMappingURL=classic.d.ts.map