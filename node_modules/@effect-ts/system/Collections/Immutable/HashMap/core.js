"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashMapIterator = exports.HashMap = void 0;
exports.applyCont = applyCont;
exports.beginMutation = beginMutation;
exports.chain = chain;
exports.chainWithIndex = chainWithIndex;
exports.chainWithIndex_ = chainWithIndex_;
exports.chain_ = chain_;
exports.compact = compact;
exports.endMutation = endMutation;
exports.filter = filter;
exports.filterMap = filterMap;
exports.filterMapWithIndex = filterMapWithIndex;
exports.filterMapWithIndex_ = filterMapWithIndex_;
exports.filterMap_ = filterMap_;
exports.filterWithIndex = filterWithIndex;
exports.filterWithIndex_ = filterWithIndex_;
exports.filter_ = filter_;
exports.forEach = forEach;
exports.forEachWithIndex = forEachWithIndex;
exports.forEachWithIndex_ = forEachWithIndex_;
exports.forEach_ = forEach_;
exports.from = from;
exports.get = get;
exports.getHash_ = getHash_;
exports.get_ = get_;
exports.has = has;
exports.hasHash_ = hasHash_;
exports.has_ = has_;
exports.isEmpty = isEmpty;
exports.keys = keys;
exports.make = make;
exports.map = map;
exports.mapWithIndex = mapWithIndex;
exports.mapWithIndex_ = mapWithIndex_;
exports.map_ = map_;
exports.modify = modify;
exports.modifyHash_ = modifyHash_;
exports.modify_ = modify_;
exports.mutate = mutate;
exports.mutate_ = mutate_;
exports.reduce = reduce;
exports.reduceWithIndex = reduceWithIndex;
exports.reduceWithIndex_ = reduceWithIndex_;
exports.reduce_ = reduce_;
exports.remove = remove;
exports.removeMany = removeMany;
exports.removeMany_ = removeMany_;
exports.remove_ = remove_;
exports.set = set;
exports.setTree_ = setTree_;
exports.set_ = set_;
exports.size = size;
exports.tryGetHash_ = tryGetHash_;
exports.unsafeGet = unsafeGet;
exports.unsafeGet_ = unsafeGet_;
exports.update = update;
exports.update_ = update_;
exports.values = values;
exports.visitLazy = visitLazy;
exports.visitLazyChildren = visitLazyChildren;

require("../../../Operator/index.js");

var _index2 = /*#__PURE__*/require("../../../Function/index.js");

var _index3 = /*#__PURE__*/require("../../../GlobalExceptions/index.js");

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Iterable/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

var _index8 = /*#__PURE__*/require("./Bitwise/index.js");

var _index9 = /*#__PURE__*/require("./Config/index.js");

var _index10 = /*#__PURE__*/require("./Nodes/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const HashMapHash = /*#__PURE__*/St.hashString("HashMap");

class HashMap {
  constructor(editable, edit, root, size) {
    this.editable = editable;
    this.edit = edit;
    this.root = root;
    this.size = size;
    this.tupleIterator = {
      [Symbol.iterator]: () => new HashMapIterator(this, ([k, v]) => Tp.tuple(k, v))
    };
  }

  [Symbol.iterator]() {
    return new HashMapIterator(this, _index2.identity);
  }

  get [St.hashSym]() {
    let hash = HashMapHash;

    for (const item of this) {
      hash ^= St.combineHash(St.hashUnknown(item[0]), St.hashUnknown(item[1]));
    }

    return hash;
  }

  [St.equalsSym](that) {
    if (that instanceof HashMap) {
      if (that.size !== this.size) {
        return false;
      }

      for (const item of this) {
        const elem = getHash_(that, item[0], St.hash(item[0]));

        if (elem._tag === "None") {
          return false;
        } else {
          if (!St.equals(item[1], elem.value)) {
            return false;
          }
        }
      }

      return true;
    }

    return false;
  }

}

exports.HashMap = HashMap;

class HashMapIterator {
  constructor(map, f) {
    this.map = map;
    this.f = f;
    this.v = visitLazy(this.map.root, this.f, undefined);
  }

  next() {
    if (O.isNone(this.v)) {
      return {
        done: true,
        value: undefined
      };
    }

    const v0 = this.v.value;
    this.v = applyCont(v0.cont);
    return {
      done: false,
      value: v0.value
    };
  }

  [Symbol.iterator]() {
    return new HashMapIterator(this.map, this.f);
  }

}
/**
 * Creates a new map
 */


exports.HashMapIterator = HashMapIterator;

function make() {
  return new HashMap(false, 0, new _index10.Empty(), 0);
}
/**
 * Creates a new map from an Iterable
 */


function from(xs) {
  return I.reduce_(xs, make(), (m, p) => set_(m, ...p));
}
/**
 * Set the root of the map
 */


function setTree_(map, newRoot, newSize) {
  if (map.editable) {
    map.root = newRoot;
    map.size = newSize;
    return map;
  }

  return newRoot === map.root ? map : new HashMap(map.editable, map.edit, newRoot, newSize);
}
/**
 * Lookup the value for `key` in `map` using custom hash.
 */


function tryGetHash_(map, key, hash) {
  let node = map.root;
  let shift = 0; // eslint-disable-next-line no-constant-condition

  while (true) switch (node._tag) {
    case "LeafNode":
      {
        return St.equals(key, node.key) ? node.value : O.none;
      }

    case "CollisionNode":
      {
        if (hash === node.hash) {
          const children = node.children;

          for (let i = 0, len = children.length; i < len; ++i) {
            const child = children[i];
            if ("key" in child && St.equals(key, child.key)) return child.value;
          }
        }

        return O.none;
      }

    case "IndexedNode":
      {
        const frag = (0, _index8.hashFragment)(shift, hash);
        const bit = (0, _index8.toBitmap)(frag);

        if (node.mask & bit) {
          node = node.children[(0, _index8.fromBitmap)(node.mask, bit)];
          shift += _index9.SIZE;
          break;
        }

        return O.none;
      }

    case "ArrayNode":
      {
        node = node.children[(0, _index8.hashFragment)(shift, hash)];

        if (node) {
          shift += _index9.SIZE;
          break;
        }

        return O.none;
      }

    default:
      return O.none;
  }
}
/**
 * Lookup the value for `key` in `map` using custom hash.
 */


function getHash_(map, key, hash) {
  return tryGetHash_(map, key, hash);
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */


function unsafeGet_(map, key) {
  const element = tryGetHash_(map, key, St.hash(key));

  if (O.isNone(element)) {
    throw new _index3.NoSuchElementException();
  }

  return element.value;
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 *
 * @ets_data_first unsafeGet_
 */


function unsafeGet(key) {
  return map => unsafeGet_(map, key);
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */


function get_(map, key) {
  return tryGetHash_(map, key, St.hash(key));
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 *
 * @ets_data_first get_
 */


function get(key) {
  return map => get_(map, key);
}
/**
 * Does an entry exist for `key` in `map`? Uses custom `hash`.
 */


function hasHash_(map, key, hash) {
  return O.isSome(tryGetHash_(map, key, hash));
}
/**
 * Does an entry exist for `key` in `map`? Uses internal hash function.
 */


function has_(map, key) {
  return O.isSome(tryGetHash_(map, key, St.hash(key)));
}
/**
 * Does an entry exist for `key` in `map`? Uses internal hash function.
 *
 * @ets_data_first has_
 */


function has(key) {
  return map => has_(map, key);
}
/**
 * Does `map` contain any elements?
 */


function isEmpty(map) {
  return map && !!(0, _index10.isEmptyNode)(map.root);
}
/**
 * Alter the value stored for `key` in `map` using function `f` using custom hash.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 */


function modifyHash_(map, key, hash, f) {
  const size = {
    value: map.size
  };
  const newRoot = map.root.modify(map.editable ? map.edit : NaN, 0, f, hash, key, size);
  return setTree_(map, newRoot, size.value);
}
/**
 * Alter the value stored for `key` in `map` using function `f` using internal hash function.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 */


function modify_(map, key, f) {
  return modifyHash_(map, key, St.hash(key), f);
}
/**
 * Alter the value stored for `key` in `map` using function `f` using internal hash function.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 *
 * @ets_data_first modify_
 */


function modify(key, f) {
  return map => modify_(map, key, f);
}
/**
 * Store `value` for `key` in `map` using internal hash function.
 */


function set_(map, key, value) {
  return modify_(map, key, (0, _index2.constant)(O.some(value)));
}
/**
 * Store `value` for `key` in `map` using internal hash function.
 *
 * @ets_data_first set_
 */


function set(key, value) {
  return map => set_(map, key, value);
}
/**
 * Remove the entry for `key` in `map` using internal hash.
 */


function remove_(map, key) {
  return modify_(map, key, (0, _index2.constant)(O.none));
}
/**
 * Remove the entry for `key` in `map` using internal hash.
 *
 * @ets_data_first remove_
 */


function remove(key) {
  return map => remove_(map, key);
}
/**
 * Mark `map` as mutable.
 */


function beginMutation(map) {
  return new HashMap(true, map.edit + 1, map.root, map.size);
}
/**
 * Mark `map` as immutable.
 */


function endMutation(map) {
  map.editable = false;
  return map;
}
/**
 * Mutate `map` within the context of `f`.
 *
 * @ets_data_first mutate_
 */


function mutate(f) {
  return map => mutate_(map, f);
}
/**
 * Mutate `map` within the context of `f`.
 */


function mutate_(map, f) {
  const transient = beginMutation(map);
  f(transient);
  return endMutation(transient);
}

function applyCont(cont) {
  return cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : O.none;
}

function visitLazyChildren(len, children, i, f, cont) {
  while (i < len) {
    const child = children[i++];

    if (child && !(0, _index10.isEmptyNode)(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }

  return applyCont(cont);
}
/**
 * Visit each leaf lazily
 */


function visitLazy(node, f, cont = undefined) {
  switch (node._tag) {
    case "LeafNode":
      {
        return O.isSome(node.value) ? O.some({
          value: f((0, _index2.tuple)(node.key, node.value.value)),
          cont
        }) : applyCont(cont);
      }

    case "CollisionNode":
    case "ArrayNode":
    case "IndexedNode":
      {
        const children = node.children;
        return visitLazyChildren(children.length, children, 0, f, cont);
      }

    default:
      {
        return applyCont(cont);
      }
  }
}
/**
 * Get an IterableIterator of the map keys
 */


function keys(map) {
  return new HashMapIterator(map, ([k]) => k);
}
/**
 * Get an IterableIterator of the map values
 */


function values(map) {
  return new HashMapIterator(map, ([, v]) => v);
}
/**
 * Update a value if exists
 */


function update_(map, key, f) {
  return modify_(map, key, O.map(f));
}
/**
 * Update a value if exists
 *
 * @ets_data_first update_
 */


function update(key, f) {
  return map => update_(map, key, f);
}
/**
 * Reduce a state over the map entries
 */


function reduceWithIndex_(map, z, f) {
  const root = map.root;
  if (root._tag === "LeafNode") return O.isSome(root.value) ? f(z, root.key, root.value.value) : z;

  if (root._tag === "Empty") {
    return z;
  }

  const toVisit = [root.children];
  let children;

  while (children = toVisit.pop()) {
    for (let i = 0, len = children.length; i < len;) {
      const child = children[i++];

      if (child && !(0, _index10.isEmptyNode)(child)) {
        if (child._tag === "LeafNode") {
          if (O.isSome(child.value)) {
            z = f(z, child.key, child.value.value);
          }
        } else toVisit.push(child.children);
      }
    }
  }

  return z;
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduceWithIndex_
 */


function reduceWithIndex(z, f) {
  return map => reduceWithIndex_(map, z, f);
}
/**
 * Reduce a state over the map entries
 */


function reduce_(map, z, f) {
  return reduceWithIndex_(map, z, (z, _, v) => f(z, v));
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */


function reduce(z, f) {
  return map => reduce_(map, z, f);
}
/**
 * Apply f to each element
 */


function forEachWithIndex_(map, f) {
  reduceWithIndex_(map, undefined, (_, key, value) => f(key, value));
}
/**
 * Apply f to each element
 *
 * @ets_data_first forEachWithIndex_
 */


function forEachWithIndex(f) {
  return map => forEachWithIndex_(map, f);
}
/**
 * Apply f to each element
 */


function forEach_(map, f) {
  forEachWithIndex_(map, (_, value) => f(value));
}
/**
 * Apply f to each element
 *
 * @ets_data_first forEach_
 */


function forEach(f) {
  return map => forEach_(map, f);
}
/**
 * Maps over the map entries
 */


function mapWithIndex_(map, f) {
  return reduceWithIndex_(map, make(), (z, k, v) => set_(z, k, f(k, v)));
}
/**
 * Maps over the map entries
 *
 * @ets_data_first mapWithIndex_
 */


function mapWithIndex(f) {
  return map => mapWithIndex_(map, f);
}
/**
 * Maps over the map entries
 */


function map_(map, f) {
  return reduceWithIndex_(map, make(), (z, k, v) => set_(z, k, f(v)));
}
/**
 * Maps over the map entries
 *
 * @ets_data_first map_
 */


function map(f) {
  return map => map_(map, f);
}
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 */


function chain_(map, f) {
  return reduceWithIndex_(map, make(), (z, _, v) => mutate_(z, m => {
    forEachWithIndex_(f(v), (_k, _a) => {
      set_(m, _k, _a);
    });
  }));
}
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return map => chain_(map, f);
}
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 */


function chainWithIndex_(map, f) {
  return reduceWithIndex_(map, make(), (z, k, v) => mutate_(z, m => {
    forEachWithIndex_(f(k, v), (_k, _a) => {
      set_(m, _k, _a);
    });
  }));
}
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 *
 * @ets_data_first chainWithIndex_
 */


function chainWithIndex(f) {
  return map => chainWithIndex_(map, f);
}
/**
 * Removes None values
 */


function compact(fa) {
  return filterMapWithIndex_(fa, (_, a) => a);
}
/**
 * Filter out None and map
 */


function filterMapWithIndex_(fa, f) {
  const m = make();
  return mutate_(m, m => {
    for (const [k, a] of fa) {
      const o = f(k, a);

      if (O.isSome(o)) {
        set_(m, k, o.value);
      }
    }
  });
}
/**
 * Filter out None and map
 *
 * @ets_data_first filterMapWithIndex_
 */


function filterMapWithIndex(f) {
  return fa => filterMapWithIndex_(fa, f);
}
/**
 * Filter out None and map
 */


function filterMap_(fa, f) {
  return filterMapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Filter out None and map
 *
 * @ets_data_first filterMap_
 */


function filterMap(f) {
  return fa => filterMap_(fa, f);
}
/**
 * Filter out by predicate
 */


function filterWithIndex_(fa, p) {
  const m = make();
  return mutate_(m, m => {
    for (const [k, a] of fa) {
      if (p(k, a)) {
        set_(m, k, a);
      }
    }
  });
}
/**
 * Filter out by predicate
 *
 * @ets_data_first filterWithIndex_
 */


function filterWithIndex(p) {
  return fa => filterWithIndex_(fa, p);
}

function filter_(fa, p) {
  return filterWithIndex_(fa, (_, a) => p(a));
}

function filter(p) {
  return fa => filter_(fa, p);
}
/**
 * Calculate the number of key/value pairs in a map
 */


function size(map) {
  return map.size;
}
/**
 * Remove many keys
 */


function removeMany_(self, ks) {
  return mutate_(self, m => {
    for (const k of ks) {
      remove_(m, k);
    }
  });
}
/**
 * Remove many keys
 *
 * @ets_data_first removeMany_
 */


function removeMany(ks) {
  return self => removeMany_(self, ks);
}
//# sourceMappingURL=core.js.map