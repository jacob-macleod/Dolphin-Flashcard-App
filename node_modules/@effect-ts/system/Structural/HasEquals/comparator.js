"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createComparator = createComparator;

var _utils = /*#__PURE__*/require("./utils.js");

const {
  isArray
} = Array;
const HAS_MAP_SUPPORT = typeof Map === "function";
const HAS_SET_SUPPORT = typeof Set === "function";
const OBJECT_TYPEOF = "object";

function createComparator(createIsEqual) {
  const isEqual = typeof createIsEqual === "function" ? createIsEqual(comparator) : comparator;
  /**
   * @function comparator
   *
   * @description
   * compare the value of the two objects and return true if they are equivalent in values
   *
   * @param a the value to test against
   * @param b the value to test
   * @param [meta] an optional meta object that is passed through to all equality test calls
   * @returns are a and b equivalent in value
   */

  function comparator(a, b, meta) {
    if ((0, _utils.sameValueZeroEqual)(a, b)) {
      return true;
    }

    if (a && b && typeof a === OBJECT_TYPEOF && typeof b === OBJECT_TYPEOF) {
      if ((0, _utils.isPlainObject)(a) && (0, _utils.isPlainObject)(b)) {
        return (0, _utils.areObjectsEqual)(a, b, isEqual, meta);
      }

      const arrayA = isArray(a);
      const arrayB = isArray(b);

      if (arrayA || arrayB) {
        return arrayA === arrayB && (0, _utils.areArraysEqual)(a, b, isEqual, meta);
      }

      const aDate = a instanceof Date;
      const bDate = b instanceof Date;

      if (aDate || bDate) {
        return aDate === bDate && (0, _utils.sameValueZeroEqual)(a.getTime(), b.getTime());
      }

      const aRegExp = a instanceof RegExp;
      const bRegExp = b instanceof RegExp;

      if (aRegExp || bRegExp) {
        return aRegExp === bRegExp && (0, _utils.areRegExpsEqual)(a, b);
      }

      if ((0, _utils.isPromiseLike)(a) || (0, _utils.isPromiseLike)(b)) {
        return a === b;
      }

      if (HAS_MAP_SUPPORT) {
        const aMap = a instanceof Map;
        const bMap = b instanceof Map;

        if (aMap || bMap) {
          return aMap === bMap && (0, _utils.areMapsEqual)(a, b, isEqual, meta);
        }
      }

      if (HAS_SET_SUPPORT) {
        const aSet = a instanceof Set;
        const bSet = b instanceof Set;

        if (aSet || bSet) {
          return aSet === bSet && (0, _utils.areSetsEqual)(a, b, isEqual, meta);
        }
      }

      return (0, _utils.areObjectsEqual)(a, b, isEqual, meta);
    }

    return false;
  }

  return isEqual;
}
//# sourceMappingURL=comparator.js.map