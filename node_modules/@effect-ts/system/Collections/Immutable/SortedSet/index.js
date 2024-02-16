"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SortedSet = void 0;
exports.add = add;
exports.add_ = add_;
exports.chain = chain;
exports.chain_ = chain_;
exports.difference = difference;
exports.difference_ = difference_;
exports.equal = equal;
exports.every = every;
exports.every_ = every_;
exports.filter = filter;
exports.filter_ = filter_;
exports.forEach_ = forEach_;
exports.has_ = has_;
exports.intersection = intersection;
exports.intersection_ = intersection_;
exports.isSubset = isSubset;
exports.isSubset_ = isSubset_;
exports.make = make;
exports.map = map;
exports.map_ = map_;
exports.partition = partition;
exports.partition_ = partition_;
exports.reduce = reduce;
exports.reduce_ = reduce_;
exports.remove = remove;
exports.remove_ = remove_;
exports.size = size;
exports.some = some;
exports.some_ = some_;
exports.toggle = toggle;
exports.toggle_ = toggle_;
exports.union = union;
exports.union_ = union_;
exports.values = values;

require("../../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

var RB = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../RedBlackTree/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class SortedSet {
  constructor(keyTree) {
    this.keyTree = keyTree;
  }

  [Symbol.iterator]() {
    return RB.keys_(this.keyTree);
  }

  get [St.hashSym]() {
    return this.keyTree[St.hashSym];
  }

  [St.equalsSym](that) {
    return this.keyTree[St.equalsSym](that);
  }

}

exports.SortedSet = SortedSet;

function make(K) {
  return new SortedSet(RB.make(K));
}

function add_(set, v) {
  return RB.has_(set.keyTree, v) ? set : new SortedSet(RB.insert_(set.keyTree, v, true));
}

function add(v) {
  return set => add_(set, v);
}

function remove_(set, v) {
  return new SortedSet(RB.removeFirst_(set.keyTree, v));
}

function remove(v) {
  return set => remove_(set, v);
}

function values(set) {
  return RB.keys_(set.keyTree);
}

function has_(set, v) {
  return RB.has_(set.keyTree, v);
}
/**
 * Apply f to each element
 */


function forEach_(map, f) {
  RB.forEach_(map.keyTree, k => {
    f(k);
  });
}
/**
 * The set of elements which are in both the first and second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */


function intersection_(l, r) {
  let x = make(l.keyTree.ord);

  for (const k of r) {
    if (has_(l, k)) {
      x = add_(x, k);
    }
  }

  return x;
}
/**
 * The set of elements which are in both the first and second set
 *
 * @ets_data_first intersection_
 */


function intersection(r) {
  return l => intersection_(l, r);
}
/**
 * Projects a Set through a function
 */


function map_(E) {
  return (set, f) => {
    let r = make(E);
    forEach_(set, e => {
      const v = f(e);

      if (!has_(r, v)) {
        r = add_(r, v);
      }
    });
    return r;
  };
}
/**
 * Projects a Set through a function
 *
 * @ets_data_first map_
 */


function map(E) {
  const m = map_(E);
  return f => set => m(set, f);
}
/**
 * true if one or more elements match predicate
 *
 * @ets_data_first some_
 */


function some(predicate) {
  return set => some_(set, predicate);
}
/**
 * true if one or more elements match predicate
 */


function some_(set, predicate) {
  let found = false;

  for (const e of set) {
    found = predicate(e);

    if (found) {
      break;
    }
  }

  return found;
}
/**
 * Calculate the number of keys pairs in a set
 */


function size(set) {
  return RB.size(set.keyTree);
}
/**
 * Creates an equal for a set
 */


function equal() {
  return {
    equals: (x, y) => {
      if (y === x) {
        return true;
      }

      if (size(x) !== size(y)) {
        return false;
      }

      let eq = true;

      for (const vx of x) {
        if (!has_(y, vx)) {
          eq = false;
          break;
        }
      }

      return eq;
    }
  };
}
/**
 * true if all elements match predicate
 *
 * @ets_data_first every_
 */


function every(predicate) {
  return set => every_(set, predicate);
}
/**
 * true if all elements match predicate
 */


function every_(set, predicate) {
  return (0, _index2.not)(some((0, _index2.not)(predicate)))(set);
}
/**
 * Map + Flatten
 *
 * @ets_data_first chain_
 */


function chain(E) {
  const c = chain_(E);
  return f => set => c(set, f);
}
/**
 * Map + Flatten
 */


function chain_(E) {
  return (set, f) => {
    let r = make(E);
    forEach_(set, e => {
      for (const a of f(e)) {
        if (!has_(r, a)) {
          r = add_(r, a);
        }
      }
    });
    return r;
  };
}
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @ets_data_first isSubset_
 */


function isSubset(y) {
  return x => isSubset_(y, x);
}
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */


function isSubset_(x, y) {
  return every_(x, a => has_(y, a));
}

function filter(predicate) {
  return set => filter_(set, predicate);
}

function filter_(set, predicate) {
  let r = make(set.keyTree.ord);
  const values_ = values(set);
  let e;

  while (!(e = values_.next()).done) {
    const value = e.value;

    if (predicate(value)) {
      r = add_(r, value);
    }
  }

  return r;
}

function partition(predicate) {
  return set => partition_(set, predicate);
}

function partition_(set, predicate) {
  const values_ = values(set);
  let e;
  let right = make(set.keyTree.ord);
  let left = make(set.keyTree.ord);

  while (!(e = values_.next()).done) {
    const value = e.value;

    if (predicate(value)) {
      right = add_(right, value);
    } else {
      left = add_(left, value);
    }
  }

  return Tp.tuple(left, right);
}
/**
 * Form the set difference (`x` - `y`)
 */


function difference_(x, y) {
  let s = x;

  for (const k of y) {
    s = remove_(s, k);
  }

  return s;
}
/**
 * Form the set difference (`x` - `y`)
 *
 * @ets_data_first difference_
 */


function difference(y) {
  return x => difference_(x, y);
}
/**
 * Reduce a state over the map entries
 */


function reduce_(set, z, f) {
  return RB.reduceWithIndex_(set.keyTree, z, (z, v) => f(z, v));
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */


function reduce(z, f) {
  return set => reduce_(set, z, f);
}
/**
 * If element is present remove it, if not add it
 *
 * @ets_data_first toggle_
 */


function toggle(a) {
  return set => toggle_(set, a);
}
/**
 * If element is present remove it, if not add it
 */


function toggle_(set, a) {
  return (has_(set, a) ? remove : add)(a)(set);
}
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 */


function union_(l, r) {
  let x = make(l.keyTree.ord);
  forEach_(l, a => {
    x = add_(x, a);
  });

  for (const a of r) {
    x = add_(x, a);
  }

  return x;
}
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 *
 * @ets_data_first union_
 */


function union(y) {
  return x => union_(x, y);
}
//# sourceMappingURL=index.js.map