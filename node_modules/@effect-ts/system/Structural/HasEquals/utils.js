"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToCache = addToCache;
exports.areArraysEqual = areArraysEqual;
exports.areMapsEqual = areMapsEqual;
exports.areObjectsEqual = areObjectsEqual;
exports.areRegExpsEqual = areRegExpsEqual;
exports.areSetsEqual = areSetsEqual;
exports.createCircularEqualCreator = createCircularEqualCreator;
exports.getNewCache = void 0;
exports.getNewCacheFallback = getNewCacheFallback;
exports.hasPair = hasPair;
exports.hasValue = hasValue;
exports.isPlainObject = isPlainObject;
exports.isPromiseLike = isPromiseLike;
exports.isReactElement = isReactElement;
exports.sameValueZeroEqual = sameValueZeroEqual;
exports.toPairs = toPairs;
exports.toValues = toValues;
// ets_tracing: off
const HAS_WEAKSET_SUPPORT = typeof WeakSet === "function";
const {
  keys
} = Object;
/**
 * @function addToCache
 *
 * add object to cache if an object
 *
 * @param value the value to potentially add to cache
 * @param cache the cache to add to
 */

function addToCache(value, cache) {
  if (value && typeof value === "object") {
    cache.add(value);
  }
}
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


function hasPair(pairs, pairToMatch, isEqual, meta) {
  const {
    length
  } = pairs;
  let pair;

  for (let index = 0; index < length; index++) {
    pair = pairs[index];

    if (isEqual(pair[0], pairToMatch[0], meta) && isEqual(pair[1], pairToMatch[1], meta)) {
      return true;
    }
  }

  return false;
}
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


function hasValue(values, valueToMatch, isEqual, meta) {
  const {
    length
  } = values;

  for (let index = 0; index < length; index++) {
    if (isEqual(values[index], valueToMatch, meta)) {
      return true;
    }
  }

  return false;
}
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


function sameValueZeroEqual(a, b) {
  return a === b || a !== a && b !== b;
}
/**
 * @function isPlainObject
 *
 * @description
 * is the value a plain object
 *
 * @param value the value to test
 * @returns is the value a plain object
 */


function isPlainObject(value) {
  return value.constructor === Object || value.constructor == null;
}
/**
 * @function isPromiseLike
 *
 * @description
 * is the value promise-like (meaning it is thenable)
 *
 * @param value the value to test
 * @returns is the value promise-like
 */


function isPromiseLike(value) {
  return !!value && typeof value.then === "function";
}
/**
 * @function isReactElement
 *
 * @description
 * is the value passed a react element
 *
 * @param value the value to test
 * @returns is the value a react element
 */


function isReactElement(value) {
  return !!(value && value.$$typeof);
}
/**
 * @function getNewCacheFallback
 *
 * @description
 * in cases where WeakSet is not supported, creates a new custom
 * object that mimics the necessary API aspects for cache purposes
 *
 * @returns the new cache object
 */


function getNewCacheFallback() {
  return Object.create({
    _values: [],

    add(value) {
      // @ts-expect-error
      this._values.push(value);
    },

    has(value) {
      // @ts-expect-error
      return this._values.indexOf(value) !== -1;
    }

  });
}
/**
 * @function getNewCache
 *
 * @description
 * get a new cache object to prevent circular references
 *
 * @returns the new cache object
 */


const getNewCache = /*#__PURE__*/(canUseWeakMap => {
  if (canUseWeakMap) {
    return function _getNewCache() {
      return new WeakSet();
    };
  }

  return getNewCacheFallback;
})(HAS_WEAKSET_SUPPORT);
/**
 * @function createCircularEqualCreator
 *
 * @description
 * create a custom isEqual handler specific to circular objects
 *
 * @param [isEqual] the isEqual comparator to use instead of isDeepEqual
 * @returns the method to create the `isEqual` function
 */


exports.getNewCache = getNewCache;

function createCircularEqualCreator(isEqual) {
  return function createCircularEqual(comparator) {
    const _comparator = isEqual ? isEqual(comparator) : comparator;

    return function circularEqual(a, b, cache = getNewCache()) {
      const hasA = cache.has(a);
      const hasB = cache.has(b);

      if (hasA || hasB) {
        return hasA && hasB;
      }

      addToCache(a, cache);
      addToCache(b, cache);
      return _comparator(a, b, cache);
    };
  };
}
/**
 * @function toPairs
 *
 * @description
 * convert the map passed into pairs (meaning an array of [key, value] tuples)
 *
 * @param map the map to convert to [key, value] pairs (entries)
 * @returns the [key, value] pairs
 */


function toPairs(map) {
  const pairs = new Array(map.size);
  let index = 0;
  map.forEach((value, key) => {
    pairs[index++] = [key, value];
  });
  return pairs;
}
/**
 * @function toValues
 *
 * @description
 * convert the set passed into values
 *
 * @param set the set to convert to values
 * @returns the values
 */


function toValues(set) {
  const values = new Array(set.size);
  let index = 0;
  set.forEach(value => {
    values[index++] = value;
  });
  return values;
}
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


function areArraysEqual(a, b, isEqual, meta) {
  const {
    length
  } = a;

  if (b.length !== length) {
    return false;
  }

  for (let index = 0; index < length; index++) {
    if (!isEqual(a[index], b[index], meta)) {
      return false;
    }
  }

  return true;
}
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


function areMapsEqual(a, b, isEqual, meta) {
  if (a.size !== b.size) {
    return false;
  }

  const pairsA = toPairs(a);
  const pairsB = toPairs(b);
  return isEqual(pairsA, pairsB, meta);
}

const OWNER = "_owner";
const hasOwnProperty = /*#__PURE__*/Function.prototype.bind.call(Function.prototype.call, Object.prototype.hasOwnProperty);
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

function areObjectsEqual(a, b, isEqual, meta) {
  const keysA = keys(a);
  const {
    length
  } = keysA;

  if (keys(b).length !== length) {
    return false;
  }

  let key;

  for (let index = 0; index < length; index++) {
    key = keysA[index];

    if (!hasOwnProperty(b, key)) {
      return false;
    }

    if (key === OWNER && isReactElement(a)) {
      if (!isReactElement(b)) {
        return false;
      }
    } else if (!isEqual(a[key], b[key], meta)) {
      return false;
    }
  }

  return true;
}
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


function areRegExpsEqual(a, b) {
  return a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.unicode === b.unicode && a.sticky === b.sticky && a.lastIndex === b.lastIndex;
}
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


function areSetsEqual(a, b, isEqual, meta) {
  if (a.size !== b.size) {
    return false;
  }

  const valuesA = toValues(a);
  const valuesB = toValues(b);
  return isEqual(valuesA, valuesB, meta);
}
//# sourceMappingURL=utils.js.map