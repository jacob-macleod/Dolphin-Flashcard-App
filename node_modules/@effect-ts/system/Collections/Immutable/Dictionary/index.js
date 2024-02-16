"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collect = collect;
exports.collect_ = collect_;
exports.compact = void 0;
exports.deleteAt = deleteAt;
exports.deleteAt_ = deleteAt_;
exports.empty = void 0;
exports.every = every;
exports.every_ = every_;
exports.filterMap = exports.filter = void 0;
exports.filterMapWithIndex = filterMapWithIndex;
exports.filterMapWithIndex_ = filterMapWithIndex_;
exports.filterMap_ = void 0;
exports.filterWithIndex = filterWithIndex;
exports.filterWithIndex_ = filterWithIndex_;
exports.fromArray = exports.filter_ = void 0;
exports.fromMutable = fromMutable;
exports.hasOwnProperty = hasOwnProperty;
exports.insertAt = insertAt;
exports.insertAt_ = insertAt_;
exports.isEmpty = isEmpty;
exports.keys = keys;
exports.lookup = lookup;
exports.lookup_ = lookup_;
exports.map = map;
exports.mapWithIndex = mapWithIndex;
exports.mapWithIndex_ = mapWithIndex_;
exports.map_ = map_;
exports.modifyAt = modifyAt;
exports.modifyAt_ = modifyAt_;
exports.partitionMap = exports.partition = void 0;
exports.partitionMapWithIndex = partitionMapWithIndex;
exports.partitionMapWithIndex_ = partitionMapWithIndex_;
exports.partitionMap_ = void 0;
exports.partitionWithIndex = partitionWithIndex;
exports.partitionWithIndex_ = partitionWithIndex_;
exports.partition_ = void 0;
exports.pop = pop;
exports.pop_ = pop_;
exports.reduceRight = exports.reduce = void 0;
exports.reduceRightWithIndex = reduceRightWithIndex;
exports.reduceRightWithIndex_ = reduceRightWithIndex_;
exports.reduceRight_ = void 0;
exports.reduceWithIndex = reduceWithIndex;
exports.reduceWithIndex_ = reduceWithIndex_;
exports.separate = exports.reduce_ = void 0;
exports.singleton = singleton;
exports.size = size;
exports.some = some;
exports.some_ = some_;
exports.toArray = void 0;
exports.toMutable = toMutable;
exports.updateAt = updateAt;
exports.updateAt_ = updateAt_;
exports.values = values;

require("../../../Operator/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Array/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/**
 * Build a readonly record from a mutable version
 */
function fromMutable(r) {
  return Object.assign({}, r);
}
/**
 * Converts the record to a mutable version
 */


function toMutable(r) {
  return Object.assign({}, r);
}
/**
 * Calculate the number of key/value pairs in a record
 */


function size(r) {
  return Object.keys(r).length;
}
/**
 * Test whether a record is empty
 */


function isEmpty(r) {
  return Object.keys(r).length === 0;
}
/**
 * Extract record keys
 */


function keys(r) {
  return Object.keys(r).sort();
}
/**
 * Extract record values
 */


function values(r) {
  return Object.keys(r).sort().map(s => r[s]);
}
/**
 * Map a record into an array
 */


function collect(f) {
  return r => collect_(r, f);
}
/**
 * Map a record into an array
 */


function collect_(r, f) {
  const out = [];

  for (const key of keys(r)) {
    out.push(f(key, r[key]));
  }

  return out;
}
/**
 * Insert or replace a key/value pair in a record
 */


function insertAt(k, a) {
  return r => insertAt_(r, k, a);
}
/**
 * Insert or replace a key/value pair in a record
 */


function insertAt_(r, k, a) {
  if (r[k] === a) {
    return r;
  }

  const out = Object.assign({}, r);
  out[k] = a;
  return out;
}
/**
 * Check if k is a key
 */


function hasOwnProperty(r, k) {
  return Object.prototype.hasOwnProperty.call(r, k);
}
/**
 * Delete a key
 */


function deleteAt(k) {
  return r => deleteAt_(r, k);
}
/**
 * Delete a key
 */


function deleteAt_(r, k) {
  if (!Object.prototype.hasOwnProperty.call(r, k)) {
    return r;
  }

  const out = Object.assign({}, r);
  delete out[k];
  return out;
}
/**
 * Update a key value pair
 */


function updateAt(k, a) {
  return r => updateAt_(r, k, a);
}
/**
 * Update a key value pair
 */


function updateAt_(r, k, a) {
  if (!hasOwnProperty(r, k)) {
    return O.none;
  }

  if (r[k] === a) {
    return O.some(r);
  }

  const out = Object.assign({}, r);
  out[k] = a;
  return O.some(out);
}
/**
 * Modify the value at key k with f
 */


function modifyAt(k, f) {
  return r => modifyAt_(r, k, f);
}
/**
 * Modify the value at key k with f
 */


function modifyAt_(r, k, f) {
  if (!hasOwnProperty(r, k)) {
    return O.none;
  }

  const out = Object.assign({}, r);
  out[k] = f(r[k]);
  return O.some(out);
}
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 */


function pop(k) {
  return r => pop_(r, k);
}
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 */


function pop_(r, k) {
  const deleteAtk = deleteAt(k);
  const oa = lookup_(r, k);
  return O.isNone(oa) ? O.none : O.some(Tp.tuple(oa.value, deleteAtk(r)));
}
/**
 * Lookup the value for a key in a record
 */


function lookup_(r, k) {
  return Object.prototype.hasOwnProperty.call(r, k) ? O.some(r[k]) : O.none;
}
/**
 * Lookup the value for a key in a record
 */


function lookup(k) {
  return r => Object.prototype.hasOwnProperty.call(r, k) ? O.some(r[k]) : O.none;
}
/**
 * Empty record
 */


const empty = {};
/**
 * Map a record passing the keys to the iterating function
 */

exports.empty = empty;

function mapWithIndex(f) {
  return fa => mapWithIndex_(fa, f);
}
/**
 * Map a record passing the keys to the iterating function
 */


function mapWithIndex_(fa, f) {
  const out = {};
  const keys = Object.keys(fa);

  for (const key of keys) {
    out[key] = f(key, fa[key]);
  }

  return out;
}
/**
 * Map a record passing the values to the iterating function
 */


function map(f) {
  return fa => map_(fa, f);
}
/**
 * Map a record passing the values to the iterating function
 */


function map_(fa, f) {
  return mapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Reduce the record passing the index toghether with the value to f
 */


function reduceWithIndex(b, f) {
  return fa => reduceWithIndex_(fa, b, f);
}
/**
 * Reduce the record passing the index toghether with the value to f
 */


function reduceWithIndex_(fa, b, f) {
  let out = b;
  const keys = Object.keys(fa).sort();
  const len = keys.length;

  for (let i = 0; i < len; i++) {
    const k = keys[i];
    out = f(k, out, fa[k]);
  }

  return out;
}
/**
 * Reduce the record passing the index toghether with the value to f
 *
 * Inverted order
 */


function reduceRightWithIndex(b, f) {
  return fa => reduceRightWithIndex_(fa, b, f);
}
/**
 * Reduce the record passing the index toghether with the value to f
 *
 * Inverted order
 */


function reduceRightWithIndex_(fa, b, f) {
  let out = b;
  const keys = Object.keys(fa).sort();
  const len = keys.length;

  for (let i = len - 1; i >= 0; i--) {
    const k = keys[i];
    out = f(k, fa[k], out);
  }

  return out;
}
/**
 * Create a record with one key/value pair
 */


function singleton(k, a) {
  return {
    [k]: a
  };
}
/**
 * Partition a record using f that also consumes the entry key
 */


function partitionMapWithIndex(f) {
  return fa => partitionMapWithIndex_(fa, f);
}
/**
 * Partition a record using f that also consumes the entry key
 */


function partitionMapWithIndex_(fa, f) {
  const left = {};
  const right = {};
  const keys = Object.keys(fa);

  for (const key of keys) {
    const e = f(key, fa[key]);

    switch (e._tag) {
      case "Left":
        left[key] = e.left;
        break;

      case "Right":
        right[key] = e.right;
        break;
    }
  }

  return Tp.tuple(left, right);
}

function partitionWithIndex(predicateWithIndex) {
  return fa => partitionWithIndex_(fa, predicateWithIndex);
}

function partitionWithIndex_(fa, predicateWithIndex) {
  const left = {};
  const right = {};
  const keys = Object.keys(fa);

  for (const key of keys) {
    const a = fa[key];

    if (predicateWithIndex(key, a)) {
      right[key] = a;
    } else {
      left[key] = a;
    }
  }

  return Tp.tuple(left, right);
}

function filterMapWithIndex(f) {
  return fa => filterMapWithIndex_(fa, f);
}
/**
 * Filter & map the record entries with f that consumes also the entry index
 */


function filterMapWithIndex_(fa, f) {
  const r = {};
  const keys = Object.keys(fa);

  for (const key of keys) {
    const optionB = f(key, fa[key]);

    if (O.isSome(optionB)) {
      r[key] = optionB.value;
    }
  }

  return r;
}

function filterWithIndex(predicateWithIndex) {
  return fa => filterWithIndex_(fa, predicateWithIndex);
}

function filterWithIndex_(fa, predicateWithIndex) {
  const out = {};
  let changed = false;

  for (const key in fa) {
    if (Object.prototype.hasOwnProperty.call(fa, key)) {
      const a = fa[key];

      if (predicateWithIndex(key, a)) {
        out[key] = a;
      } else {
        changed = true;
      }
    }
  }

  return changed ? out : fa;
}
/**
 * Checks a predicate against all the record entries
 */


function every(predicate) {
  return r => every_(r, predicate);
}
/**
 * Checks a predicate against all the record entries
 */


function every_(r, predicate) {
  for (const k in r) {
    if (!predicate(r[k])) {
      return false;
    }
  }

  return true;
}
/**
 * Checks a predicate against some of the record entries
 */


function some(predicate) {
  return r => some_(r, predicate);
}
/**
 * Checks a predicate against some of the record entries
 */


function some_(r, predicate) {
  for (const k in r) {
    if (predicate(r[k])) {
      return true;
    }
  }

  return false;
}
/**
 * Drop the None entries
 */


const compact = fa => {
  const r = {};
  const keys = Object.keys(fa);

  for (const key of keys) {
    const optionA = fa[key];

    if (O.isSome(optionA)) {
      r[key] = optionA.value;
    }
  }

  return r;
};
/**
 * Separate the record entries
 */


exports.compact = compact;

const separate = fa => {
  const left = {};
  const right = {};
  const keys = Object.keys(fa);

  for (const key of keys) {
    const e = fa[key];

    switch (e._tag) {
      case "Left":
        left[key] = e.left;
        break;

      case "Right":
        right[key] = e.right;
        break;
    }
  }

  return Tp.tuple(left, right);
};
/**
 * Filter record entries according to a predicate
 */


exports.separate = separate;

const filter = predicate => fa => filter_(fa, predicate);
/**
 * Filter record entries according to a predicate
 */


exports.filter = filter;

const filter_ = (fa, predicate) => filterWithIndex_(fa, (_, a) => predicate(a));
/**
 * Filter & map record entries according to a predicate
 */


exports.filter_ = filter_;

const filterMap = f => fa => filterMap_(fa, f);
/**
 * Filter & map record entries according to a predicate
 */


exports.filterMap = filterMap;

const filterMap_ = (fa, f) => filterMapWithIndex_(fa, (_, a) => f(a));
/**
 * Partition record entries according to a predicate
 */


exports.filterMap_ = filterMap_;

const partition = predicate => fa => partition_(fa, predicate);
/**
 * Partition record entries according to a predicate
 */


exports.partition = partition;

const partition_ = (fa, predicate) => partitionWithIndex_(fa, (_, a) => predicate(a));
/**
 * Partition & map record entries
 */


exports.partition_ = partition_;

const partitionMap = f => fa => partitionMap_(fa, f);
/**
 * Partition & map record entries
 */


exports.partitionMap = partitionMap;

const partitionMap_ = (fa, f) => partitionMapWithIndex_(fa, (_, a) => f(a));
/**
 * Reduce record entries
 */


exports.partitionMap_ = partitionMap_;

const reduce = (b, f) => fa => reduce_(fa, b, f);
/**
 * Reduce record entries
 */


exports.reduce = reduce;

const reduce_ = (fa, b, f) => reduceWithIndex_(fa, b, (_, b, a) => f(b, a));
/**
 * Reduce record entries in inverted order
 */


exports.reduce_ = reduce_;

const reduceRight = (b, f) => fa => reduceRight_(fa, b, f);
/**
 * Reduce record entries in inverted order
 */


exports.reduceRight = reduceRight;

const reduceRight_ = (fa, b, f) => reduceRightWithIndex_(fa, b, (_, a, b) => f(a, b));
/**
 * Converts a record into an array of [key, value]
 */


exports.reduceRight_ = reduceRight_;
const toArray = /*#__PURE__*/collect(Tp.tuple);
/**
 * Converts an array of [key, value] into a record
 */

exports.toArray = toArray;

const fromArray = _ => A.reduce_(_, {}, (b, {
  tuple: [k, v]
}) => Object.assign(b, {
  [k]: v
}));

exports.fromArray = fromArray;
//# sourceMappingURL=index.js.map