"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashSet = void 0;
exports.add = add;
exports.add_ = add_;
exports.contains = contains;
exports.contains_ = contains_;
exports.from = from;
exports.isEmpty = isEmpty;
exports.make = make;
exports.remove = remove;
exports.remove_ = remove_;
exports.size = size;

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Iterable/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var MHM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../HashMap/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class HashSet {
  constructor() {
    this.hashMap = MHM.make();
  }

  size() {
    return this.hashMap.length.get;
  }

  isEmpty() {
    return this.size() === 0;
  }

  contains(a) {
    return O.getOrElse_(this.hashMap.get(a), () => false);
  }

  add(a) {
    this.hashMap.set(a, true);
    return this.contains(a);
  }

  remove(a) {
    this.hashMap.remove(a);
    return !this.contains(a);
  }

  [Symbol.iterator]() {
    return I.map_(this.hashMap, ([a]) => a)[Symbol.iterator]();
  }

}
/**
 * Creates a new set
 */


exports.HashSet = HashSet;

function make() {
  return new HashSet();
}
/**
 * Creates a new set from an Iterable
 */


function from(xs) {
  const res = make();

  for (const v of xs) {
    res.add(v);
  }

  return res;
}
/**
 * Calculate the number of values in a set
 */


function size(self) {
  return self.size();
}
/**
 * returns `true` if the set is empty
 */


function isEmpty(self) {
  return self.isEmpty();
}
/**
 * Creates a new set
 *
 * @ets_data_first contains_
 */


function contains_(self, a) {
  return self.contains(a);
}
/**
 * return true if the set contains `a`
 *
 * @ets_data_first contains_
 */


function contains(a) {
  return self => contains_(self, a);
}
/**
 * add `a` to the set
 */


function add_(self, a) {
  return self.add(a);
}
/**
 * add `a` to the set
 *
 * @ets_data_first add_
 */


function add(a) {
  return self => add_(self, a);
}
/**
 * remove `a` from the set
 */


function remove_(self, a) {
  return self.remove(a);
}
/**
 * remove `a` from the set
 *
 * @ets_data_first remove_
 */


function remove(a) {
  return self => remove_(self, a);
}
//# sourceMappingURL=index.js.map