"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TArrayTypeId = exports.TArray = void 0;
exports.empty = empty;
exports.find = find;
exports.findLast = findLast;
exports.findLast_ = findLast_;
exports.find_ = find_;
exports.fromIterable = fromIterable;
exports.get = get;
exports.get_ = get_;
exports.make = make;

var _index = /*#__PURE__*/require("../../GlobalExceptions/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var STM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../STM/index.js"));

var TRef = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../TRef/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const TArrayTypeId = /*#__PURE__*/Symbol();
exports.TArrayTypeId = TArrayTypeId;

class TArray {
  constructor(array) {
    this.array = array;
    this._typeId = TArrayTypeId;
  }

}
/**
 * Makes a new `TArray` initialized with provided iterable.
 */


exports.TArray = TArray;

function fromIterable(it) {
  return STM.map_(STM.forEach_(it, TRef.make), as => new TArray(as));
}
/**
 * Makes a new `TArray` that is initialized with specified values.
 */


function make(...data) {
  return fromIterable(data);
}
/**
 * Makes a new `TArray` that is initialized with specified values.
 */


function empty() {
  return fromIterable([]);
}
/**
 * Extracts value from ref in array.
 */


function get_(self, index) {
  if (!Number.isInteger(index) || index < 0 || index >= self.array.length) {
    return STM.die(new _index.ArrayIndexOutOfBoundsException(index));
  }

  return TRef.get(self.array[index]);
}
/**
 * Extracts value from ref in array.
 *
 * @ets_data_first get_
 */


function get(index) {
  return self => get_(self, index);
}
/**
 * Find the first element in the array matching a predicate.
 */


function find_(self, p) {
  return new STM.STMEffect(journal => {
    let i = 0;

    while (i < self.array.length) {
      const a = TRef.unsafeGet_(self.array[i], journal);

      if (p(a)) {
        return O.some(a);
      }

      i++;
    }

    return O.none;
  });
}
/**
 * Find the first element in the array matching a predicate.
 *
 * @ets_data_first find_
 */


function find(p) {
  return self => find_(self, p);
}
/**
 * Find the last element in the array matching a predicate.
 */


function findLast_(self, p) {
  return new STM.STMEffect(journal => {
    let i = 0;
    let res = O.emptyOf();

    while (i < self.array.length) {
      const a = TRef.unsafeGet_(self.array[i], journal);

      if (p(a)) {
        res = O.some(a);
      }

      i++;
    }

    return res;
  });
}
/**
 * Find the last element in the array matching a predicate.
 *
 * @ets_data_first find_
 */


function findLast(p) {
  return self => findLast_(self, p);
}
//# sourceMappingURL=index.js.map