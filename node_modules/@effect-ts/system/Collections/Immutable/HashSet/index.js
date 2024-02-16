"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashSet = void 0;
exports.add = add;
exports.add_ = add_;
exports.beginMutation = beginMutation;
exports.chain = chain;
exports.chain_ = chain_;
exports.difference = difference;
exports.difference_ = difference_;
exports.endMutation = endMutation;
exports.equal = equal;
exports.every = every;
exports.every_ = every_;
exports.filter = filter;
exports.filter_ = filter_;
exports.forEach_ = forEach_;
exports.from = from;
exports.has_ = has_;
exports.intersection = intersection;
exports.intersection_ = intersection_;
exports.isSubset = isSubset;
exports.isSubset_ = isSubset_;
exports.make = make;
exports.map = map;
exports.map_ = map_;
exports.mutate_ = mutate_;
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

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Iterable/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

var HM = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../HashMap/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
class HashSet {
  constructor(keyMap) {
    this.keyMap = keyMap;
  }

  [Symbol.iterator]() {
    return HM.keys(this.keyMap);
  }

  get [St.hashSym]() {
    return St.hashIterator(this[Symbol.iterator]());
  }

  [St.equalsSym](that) {
    return that instanceof HashSet && that.keyMap.size === this.keyMap.size && I.corresponds(this, that, St.equals);
  }

}

exports.HashSet = HashSet;

function make() {
  return new HashSet(HM.make());
}
/**
 * Creates a new set from an Iterable
 */


function from(xs) {
  return I.reduce_(xs, make(), (s, v) => add_(s, v));
}

function add_(set, v) {
  return set.keyMap.editable ? (HM.set_(set.keyMap, v, true), set) : new HashSet(HM.set_(set.keyMap, v, true));
}

function add(v) {
  return set => add_(set, v);
}

function remove_(set, v) {
  return set.keyMap.editable ? (HM.remove_(set.keyMap, v), set) : new HashSet(HM.remove_(set.keyMap, v));
}

function remove(v) {
  return set => remove_(set, v);
}

function values(set) {
  return HM.keys(set.keyMap);
}

function has_(set, v) {
  return HM.has_(set.keyMap, v);
}
/**
 * Apply f to each element
 */


function forEach_(map, f) {
  HM.forEachWithIndex_(map.keyMap, k => {
    f(k);
  });
}
/**
 * Mutate `set` within the context of `f`.
 */


function mutate_(set, transient) {
  const s = beginMutation(set);
  transient(s);
  return endMutation(s);
}
/**
 * The set of elements which are in both the first and second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */


function intersection_(l, r) {
  const x = make();
  return mutate_(x, y => {
    for (const k of r) {
      if (has_(l, k)) {
        add_(y, k);
      }
    }
  });
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


function map_(set, f) {
  const r = make();
  return mutate_(r, r => {
    forEach_(set, e => {
      const v = f(e);

      if (!has_(r, v)) {
        add_(r, v);
      }
    });
  });
}
/**
 * Projects a Set through a function
 *
 * @ets_data_first map_
 */


function map(f) {
  return set => map_(set, f);
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
  return HM.size(set.keyMap);
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


function chain(f) {
  return set => chain_(set, f);
}
/**
 * Map + Flatten
 */


function chain_(set, f) {
  const r = make();
  mutate_(r, r => {
    forEach_(set, e => {
      for (const a of f(e)) {
        if (!has_(r, a)) {
          add_(r, a);
        }
      }
    });
  });
  return r;
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
  const r = make();
  return mutate_(r, r => {
    const values_ = values(set);
    let e;

    while (!(e = values_.next()).done) {
      const value = e.value;

      if (predicate(value)) {
        add_(r, value);
      }
    }

    return r;
  });
}

function partition(predicate) {
  return set => partition_(set, predicate);
}

function partition_(set, predicate) {
  const values_ = values(set);
  let e;
  const right = beginMutation(make());
  const left = beginMutation(make());

  while (!(e = values_.next()).done) {
    const value = e.value;

    if (predicate(value)) {
      add_(right, value);
    } else {
      add_(left, value);
    }
  }

  return Tp.tuple(endMutation(left), endMutation(right));
}
/**
 * Mark `set` as mutable.
 */


function beginMutation(set) {
  return new HashSet(HM.beginMutation(set.keyMap));
}
/**
 * Mark `set` as immutable.
 */


function endMutation(set) {
  set.keyMap.editable = false;
  return set;
}
/**
 * Form the set difference (`x` - `y`)
 */


function difference_(x, y) {
  return mutate_(x, s => {
    for (const k of y) {
      remove_(s, k);
    }
  });
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
  return HM.reduceWithIndex_(set.keyMap, z, (z, v) => f(z, v));
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
  const x = make();
  return mutate_(x, x => {
    forEach_(l, a => {
      add_(x, a);
    });

    for (const a of r) {
      add_(x, a);
    }
  });
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