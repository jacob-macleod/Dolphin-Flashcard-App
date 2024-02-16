declare type Cache = {
    add: (value: any) => void;
    has: (value: any) => boolean;
};
/**
 * @function addToCache
 *
 * add object to cache if an object
 *
 * @param value the value to potentially add to cache
 * @param cache the cache to add to
 */
export declare function addToCache(value: any, cache: Cache): void;
export declare type EqualityComparator = (a: any, b: any, meta?: any) => boolean;
/**
 * @function hasPair
 *
 * @description
 * does the `pairToMatch` exist in the list of `pairs` provided based on the
 * `isEqual` check
 *
 * @param pairs the pairs to compare against
 * @param pairToMatch the pair to match
 * @param isEqual the equality comparator used
 * @param meta the meta provided
 * @returns does the pair exist in the pairs provided
 */
export declare function hasPair(pairs: [any, any][], pairToMatch: [any, any], isEqual: EqualityComparator, meta: any): boolean;
/**
 * @function hasValue
 *
 * @description
 * does the `valueToMatch` exist in the list of `values` provided based on the
 * `isEqual` check
 *
 * @param values the values to compare against
 * @param valueToMatch the value to match
 * @param isEqual the equality comparator used
 * @param meta the meta provided
 * @returns does the value exist in the values provided
 */
export declare function hasValue(values: any[], valueToMatch: any, isEqual: EqualityComparator, meta: any): boolean;
/**
 * @function sameValueZeroEqual
 *
 * @description
 * are the values passed strictly equal or both NaN
 *
 * @param a the value to compare against
 * @param b the value to test
 * @returns are the values equal by the SameValueZero principle
 */
export declare function sameValueZeroEqual(a: any, b: any): boolean;
/**
 * @function isPlainObject
 *
 * @description
 * is the value a plain object
 *
 * @param value the value to test
 * @returns is the value a plain object
 */
export declare function isPlainObject(value: any): boolean;
/**
 * @function isPromiseLike
 *
 * @description
 * is the value promise-like (meaning it is thenable)
 *
 * @param value the value to test
 * @returns is the value promise-like
 */
export declare function isPromiseLike(value: any): boolean;
/**
 * @function isReactElement
 *
 * @description
 * is the value passed a react element
 *
 * @param value the value to test
 * @returns is the value a react element
 */
export declare function isReactElement(value: any): boolean;
/**
 * @function getNewCacheFallback
 *
 * @description
 * in cases where WeakSet is not supported, creates a new custom
 * object that mimics the necessary API aspects for cache purposes
 *
 * @returns the new cache object
 */
export declare function getNewCacheFallback(): Cache;
/**
 * @function getNewCache
 *
 * @description
 * get a new cache object to prevent circular references
 *
 * @returns the new cache object
 */
export declare const getNewCache: () => Cache;
declare type EqualityComparatorCreator = (fn: EqualityComparator) => EqualityComparator;
/**
 * @function createCircularEqualCreator
 *
 * @description
 * create a custom isEqual handler specific to circular objects
 *
 * @param [isEqual] the isEqual comparator to use instead of isDeepEqual
 * @returns the method to create the `isEqual` function
 */
export declare function createCircularEqualCreator(isEqual?: EqualityComparatorCreator): (comparator: EqualityComparator) => (a: any, b: any, cache?: Cache) => boolean;
/**
 * @function toPairs
 *
 * @description
 * convert the map passed into pairs (meaning an array of [key, value] tuples)
 *
 * @param map the map to convert to [key, value] pairs (entries)
 * @returns the [key, value] pairs
 */
export declare function toPairs(map: Map<any, any>): [any, any][];
/**
 * @function toValues
 *
 * @description
 * convert the set passed into values
 *
 * @param set the set to convert to values
 * @returns the values
 */
export declare function toValues(set: Set<any>): any[];
/**
 * @function areArraysEqual
 *
 * @description
 * are the arrays equal in value
 *
 * @param a the array to test
 * @param b the array to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta object to pass through
 * @returns are the arrays equal
 */
export declare function areArraysEqual(a: any[], b: any[], isEqual: EqualityComparator, meta: any): boolean;
/**
 * @function areMapsEqual
 *
 * @description
 * are the maps equal in value
 *
 * @param a the map to test
 * @param b the map to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta map to pass through
 * @returns are the maps equal
 */
export declare function areMapsEqual(a: Map<any, any>, b: Map<any, any>, isEqual: EqualityComparator, meta: any): boolean;
declare type Dictionary<Type> = {
    [key: string]: Type;
    [index: number]: Type;
};
/**
 * @function areObjectsEqual
 *
 * @description
 * are the objects equal in value
 *
 * @param a the object to test
 * @param b the object to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta object to pass through
 * @returns are the objects equal
 */
export declare function areObjectsEqual(a: Dictionary<any>, b: Dictionary<any>, isEqual: EqualityComparator, meta: any): boolean;
/**
 * @function areRegExpsEqual
 *
 * @description
 * are the regExps equal in value
 *
 * @param a the regExp to test
 * @param b the regExp to test agains
 * @returns are the regExps equal
 */
export declare function areRegExpsEqual(a: RegExp, b: RegExp): boolean;
/**
 * @function areSetsEqual
 *
 * @description
 * are the sets equal in value
 *
 * @param a the set to test
 * @param b the set to test against
 * @param isEqual the comparator to determine equality
 * @param meta the meta set to pass through
 * @returns are the sets equal
 */
export declare function areSetsEqual(a: Set<any>, b: Set<any>, isEqual: EqualityComparator, meta: any): boolean;
export {};
//# sourceMappingURL=utils.d.ts.map