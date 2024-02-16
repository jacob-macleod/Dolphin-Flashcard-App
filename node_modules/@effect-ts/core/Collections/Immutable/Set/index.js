"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chain = chain;
exports.chain_ = chain_;
exports.compact = compact;
exports.difference = difference;
exports.difference_ = difference_;
exports.elem = elem;
exports.elem_ = elem_;
exports.empty = void 0;
exports.every = every;
exports.every_ = every_;
exports.filter = filter;
exports.filterMap = filterMap;
exports.filterMap_ = filterMap_;
exports.filter_ = filter_;
exports.foldMap = foldMap;
exports.foldMap_ = foldMap_;
exports.fromArray = fromArray;
exports.fromMutable = fromMutable;
exports.getEqual = getEqual;
exports.getIntersectionAssociative = getIntersectionAssociative;
exports.getShow = getShow;
exports.getUnionIdentity = getUnionIdentity;
exports.insert = insert;
exports.insert_ = insert_;
exports.intersection = intersection;
exports.intersection_ = intersection_;
exports.isSubset = isSubset;
exports.isSubset_ = isSubset_;
exports.map = map;
exports.map_ = map_;
exports.partition = partition;
exports.partitionMap = partitionMap;
exports.partitionMap_ = partitionMap_;
exports.partition_ = partition_;
exports.reduce = reduce;
exports.reduce_ = reduce_;
exports.remove = remove;
exports.remove_ = remove_;
exports.separate = separate;
exports.singleton = singleton;
exports.some = some;
exports.some_ = some_;
exports.toArray = toArray;
exports.toArray_ = toArray_;
exports.toMutable = toMutable;
exports.toggle = toggle;
exports.toggle_ = toggle_;
exports.union = union;
exports.union_ = union_;

require("../../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../../Associative/index.js");

var _index3 = /*#__PURE__*/require("../../../Equal/index.js");

var _index4 = /*#__PURE__*/require("../../../Function/index.js");

var _index5 = /*#__PURE__*/require("../../../Identity/index.js");

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const empty = /*#__PURE__*/new Set();
/**
 * Get an Associative that performs Set intersection
 */

exports.empty = empty;

function getIntersectionAssociative(E) {
  return (0, _index2.makeAssociative)(intersection_(E));
}
/**
 * Get an Identity that performs Set union
 */


function getUnionIdentity(E) {
  return (0, _index5.makeIdentity)(empty, union_(E));
}
/**
 * The set of elements which are in both the first and second set
 */


function intersection_(E) {
  const elemE = elem_(E);
  return (x, y) => {
    if (x === empty || y === empty) {
      return empty;
    }

    const r = new Set();
    x.forEach(e => {
      if (elemE(y, e)) {
        r.add(e);
      }
    });
    return r;
  };
}
/**
 * The set of elements which are in both the first and second set
 */


function intersection(E) {
  const i = intersection_(E);
  return x => y => i(x, y);
}
/**
 * Convert a mutable set to a readonly one
 */


function fromMutable(s) {
  return new Set(s);
}
/**
 * Convert a set to a mutable one
 */


function toMutable(s) {
  return new Set(s);
}
/**
 * get Show for set given Show for values
 */


function getShow(S) {
  return {
    show: s => {
      let elements = "";
      s.forEach(a => {
        elements += S.show(a) + ", ";
      });

      if (elements !== "") {
        elements = elements.substring(0, elements.length - 2);
      }

      return `new Set([${elements}])`;
    }
  };
}
/**
 * Convert a set to an Array
 */


function toArray(O) {
  return x => {
    const r = [];
    x.forEach(e => r.push(e));
    return r.sort(O.compare);
  };
}
/**
 * Convert a set to an Array
 */


function toArray_(x, O) {
  return toArray(O)(x);
}
/**
 * Get Equal for Setgiven Equal for element
 */


function getEqual(E) {
  const subsetE = isSubset_(E);
  return (0, _index3.makeEqual)((x, y) => subsetE(x, y) && subsetE(y, x));
}
/**
 * true if one or more elements match predicate
 */


function some(predicate) {
  return set => {
    const values = set.values();
    let e;
    let found = false;

    while (!found && !(e = values.next()).done) {
      found = predicate(e.value);
    }

    return found;
  };
}
/**
 * true if one or more elements match predicate
 */


function some_(set, predicate) {
  return some(predicate)(set);
}
/**
 * Projects a Set through a function
 */


function map(E) {
  const m = map_(E);
  return f => set => m(set, f);
}
/**
 * Projects a Set through a function
 */


function map_(E) {
  const elemE = elem_(E);
  return (set, f) => {
    const r = new Set();
    set.forEach(e => {
      const v = f(e);

      if (!elemE(r, v)) {
        r.add(v);
      }
    });
    return r;
  };
}
/**
 * true if all elements match predicate
 */


function every(predicate) {
  return set => every_(set, predicate);
}
/**
 * true if all elements match predicate
 */


function every_(set, predicate) {
  return (0, _index4.not)(some((0, _index4.not)(predicate)))(set);
}
/**
 * Map + Flatten
 */


function chain(E) {
  const c = chain_(E);
  return f => set => c(set, f);
}
/**
 * Map + Flatten
 */


function chain_(E) {
  const elemE = elem_(E);
  return (set, f) => {
    const r = new Set();
    set.forEach(e => {
      f(e).forEach(e => {
        if (!elemE(r, e)) {
          r.add(e);
        }
      });
    });
    return r;
  };
}
/**
 * `true` if and only if every element in the first set is an element of the second set
 */


function isSubset(E) {
  const i = isSubset_(E);
  return y => x => i(y, x);
}
/**
 * `true` if and only if every element in the first set is an element of the second set
 */


function isSubset_(E) {
  const elemE = elem_(E);
  return (x, y) => every(a => elemE(y, a))(x);
}

function filter(predicate) {
  return set => filter_(set, predicate);
}

function filter_(set, predicate) {
  const values = set.values();
  let e;
  const r = new Set();

  while (!(e = values.next()).done) {
    const value = e.value;

    if (predicate(value)) {
      r.add(value);
    }
  }

  return r;
}

function partition(predicate) {
  return set => partition_(set, predicate);
}

function partition_(set, predicate) {
  const values = set.values();
  let e;
  const right = new Set();
  const left = new Set();

  while (!(e = values.next()).done) {
    const value = e.value;

    if (predicate(value)) {
      right.add(value);
    } else {
      left.add(value);
    }
  }

  return Tp.tuple(left, right);
}
/**
 * Test if a value is a member of a set
 */


function elem_(E) {
  return (set, a) => {
    const values = set.values();
    let e;
    let found = false;

    while (!found && !(e = values.next()).done) {
      found = E.equals(a, e.value);
    }

    return found;
  };
}
/**
 * Test if a value is a member of a set
 */


function elem(E) {
  const e = elem_(E);
  return a => set => e(set, a);
}
/**
 * Partition elements according to f
 */


function partitionMap(EB, EC) {
  const pm = partitionMap_(EB, EC);
  return f => set => pm(set, f);
}
/**
 * Partition elements according to f
 */


function partitionMap_(EB, EC) {
  return (set, f) => {
    const values = set.values();
    let e;
    const left = new Set();
    const right = new Set();
    const hasB = elem_(EB);
    const hasC = elem_(EC);

    while (!(e = values.next()).done) {
      const v = f(e.value);

      switch (v._tag) {
        case "Left":
          if (!hasB(left, v.left)) {
            left.add(v.left);
          }

          break;

        case "Right":
          if (!hasC(right, v.right)) {
            right.add(v.right);
          }

          break;
      }
    }

    return Tp.tuple(left, right);
  };
}
/**
 * Form the set difference (`x` - `y`)
 */


function difference_(E) {
  const elemE = elem_(E);
  return (x, y) => filter(a => !elemE(y, a))(x);
}
/**
 * Form the set difference (`x` - `y`)
 */


function difference(E) {
  const diff = difference_(E);
  return y => x => diff(x, y);
}
/**
 * Reduce over the set values
 */


function reduce(O) {
  const red = reduce_(O);
  return (b, f) => fa => red(fa, b, f);
}
/**
 * Reduce over the set values
 */


function reduce_(O) {
  const toArrayO = toArray(O);
  return (fa, b, f) => toArrayO(fa).reduce(f, b);
}
/**
 * Fold + Map
 */


function foldMap(O, M) {
  const fm = foldMap_(O, M);
  return f => fa => fm(fa, f);
}
/**
 * Fold + Map
 */


function foldMap_(O, M) {
  const toArrayO = toArray(O);
  return (fa, f) => toArrayO(fa).reduce((b, a) => M.combine(b, f(a)), M.identity);
}
/**
 * Create a set with one element
 */


function singleton(a) {
  return new Set([a]);
}
/**
 * Insert a value into a set
 */


function insert(E) {
  const i = insert_(E);
  return a => set => i(set, a);
}
/**
 * Insert a value into a set
 */


function insert_(E) {
  const elemE = elem_(E);
  return (set, a) => {
    if (!elemE(set, a)) {
      const r = new Set(set);
      r.add(a);
      return r;
    } else {
      return set;
    }
  };
}
/**
 * Delete a value from a set
 */


function remove(E) {
  const rem = remove_(E);
  return a => set => rem(set, a);
}
/**
 * Delete a value from a set
 */


function remove_(E) {
  return (set, a) => filter(ax => !E.equals(a, ax))(set);
}
/**
 * If element is present remove it, if not add it
 */


function toggle(E) {
  const t = toggle_(E);
  return a => set => t(set, a);
}
/**
 * If element is present remove it, if not add it
 */


function toggle_(E) {
  const elemE = elem_(E);
  const removeE = remove(E);
  const insertE = insert(E);
  return (set, a) => (elemE(set, a) ? removeE : insertE)(a)(set);
}
/**
 * Create a set from an array
 */


function fromArray(E) {
  return as => {
    const len = as.length;
    const r = new Set();
    const has = elem_(E);

    for (let i = 0; i < len; i++) {
      const a = as[i];

      if (!has(r, a)) {
        r.add(a);
      }
    }

    return r;
  };
}
/**
 * Set compaction, remove none
 */


function compact(E) {
  return filterMap(E)(_index4.identity);
}
/**
 * Separate elements
 */


function separate(EE, EA) {
  return fa => {
    const elemEE = elem_(EE);
    const elemEA = elem_(EA);
    const left = new Set();
    const right = new Set();
    fa.forEach(e => {
      switch (e._tag) {
        case "Left":
          if (!elemEE(left, e.left)) {
            left.add(e.left);
          }

          break;

        case "Right":
          if (!elemEA(right, e.right)) {
            right.add(e.right);
          }

          break;
      }
    });
    return Tp.tuple(left, right);
  };
}
/**
 * Filter + Map
 */


function filterMap(E) {
  const fm = filterMap_(E);
  return f => fa => fm(fa, f);
}
/**
 * Filter + Map
 */


function filterMap_(E) {
  const elemE = elem_(E);
  return (fa, f) => {
    const r = new Set();
    fa.forEach(a => {
      const ob = f(a);

      if (ob._tag === "Some" && !elemE(r, ob.value)) {
        r.add(ob.value);
      }
    });
    return r;
  };
}
/**
 * Form the union of two sets
 */


function union_(E) {
  const elemE = elem_(E);
  return (x, y) => {
    if (x === empty) {
      return y;
    }

    if (y === empty) {
      return x;
    }

    const r = new Set(x);
    y.forEach(e => {
      if (!elemE(r, e)) {
        r.add(e);
      }
    });
    return r;
  };
}
/**
 * Form the union of two sets
 */


function union(E) {
  const u = union_(E);
  return y => x => u(x, y);
}
//# sourceMappingURL=index.js.map