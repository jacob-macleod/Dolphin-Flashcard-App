"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashMapTypeId = exports.HashMap = void 0;
exports.from = from;
exports.get = get;
exports.get_ = get_;
exports.make = make;
exports.modify = modify;
exports.modify_ = modify_;
exports.remove = remove;
exports.remove_ = remove_;
exports.set = set;
exports.set_ = set_;
exports.size = size;
exports.update = update;
exports.update_ = update_;

var I = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Iterable/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

var _index4 = /*#__PURE__*/require("../../../Support/AtomicNumber/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const HashMapTypeId = /*#__PURE__*/Symbol();
exports.HashMapTypeId = HashMapTypeId;

class Node {
  constructor(k, v, next) {
    this.k = k;
    this.v = v;
    this.next = next;
  }

  [Symbol.iterator]() {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    let c = this;
    let n = 0;
    return {
      next: () => {
        if (c) {
          const kv = [c.k, c.v];
          c = c.next;
          n++;
          return {
            value: kv,
            done: false
          };
        } else {
          return {
            value: n,
            done: true
          };
        }
      }
    };
  }

}
/**
 * A Mutable HashMap
 */


class HashMap {
  constructor() {
    this._typeId = HashMapTypeId;
    this.backingMap = new Map();
    this.length = new _index4.AtomicNumber(0);
  }

  get(k) {
    const hash = St.hash(k);
    const arr = this.backingMap.get(hash);

    if (typeof arr === "undefined") {
      return O.none;
    }

    let c = arr;

    while (c) {
      if (St.equals(k, c.k)) {
        return O.some(c.v);
      }

      c = c.next;
    }

    return O.none;
  }

  remove(k) {
    const hash = St.hash(k);
    const arr = this.backingMap.get(hash);

    if (typeof arr === "undefined") {
      return this;
    }

    if (St.equals(k, arr.k)) {
      if (typeof arr.next !== "undefined") {
        this.backingMap.set(hash, arr.next);
      } else {
        this.backingMap.delete(hash);
      }

      this.length.decrementAndGet();
      return this;
    }

    let next = arr.next;
    let curr = arr;

    while (next) {
      if (St.equals(k, next.k)) {
        curr.next = next.next;
        this.length.decrementAndGet();
        return this;
      }

      curr = next;
      next = next.next;
    }

    return this;
  }

  set(k, v) {
    const hash = St.hash(k);
    const arr = this.backingMap.get(hash);

    if (typeof arr === "undefined") {
      this.backingMap.set(hash, new Node(k, v));
      this.length.incrementAndGet();
      return this;
    }

    let c = arr;
    let l = arr;

    while (c) {
      if (St.equals(k, c.k)) {
        c.v = v;
        return this;
      }

      l = c;
      c = c.next;
    }

    this.length.incrementAndGet();
    l.next = new Node(k, v);
    return this;
  }

  update(k, f) {
    const hash = St.hash(k);
    const arr = this.backingMap.get(hash);

    if (typeof arr === "undefined") {
      return this;
    }

    let c = arr;

    while (c) {
      if (St.equals(k, c.k)) {
        c.v = f(c.v);
        return this;
      }

      c = c.next;
    }

    return this;
  }

  [Symbol.iterator]() {
    return I.chain_(this.backingMap, ([, _]) => _)[Symbol.iterator]();
  }

}
/**
 * Creates a new map
 */


exports.HashMap = HashMap;

function make() {
  return new HashMap();
}
/**
 * Creates a new map from an Iterable
 */


function from(xs) {
  const res = make();

  for (const p of xs) {
    res.set(...p);
  }

  return res;
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */


function get_(map, key) {
  return map.get(key);
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
 * Store `value` for `key` in `map` using internal hash function.
 */


function set_(map, key, value) {
  return map.set(key, value);
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
  return map.remove(key);
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
 * Calculate the number of key/value pairs in a map
 */


function size(map) {
  return map.length.get;
}
/**
 * Update a value if exists
 */


function update_(map, key, f) {
  return map.update(key, f);
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
 * Alter the value stored for `key` in `map` using function `f` using internal hash function.
 *
 *  `f` is invoked with the current value for `k` if it exists,
 * or no arguments if no such value exists.
 *
 * `modify` will always either update or insert a value into the map.
 * Returns a map with the modified value. Does not alter `map`.
 */


function modify_(map, key, f) {
  const v = f(map.get(key));

  if (O.isSome(v)) {
    map.set(key, v.value);
  } else {
    map.remove(key);
  }

  return map;
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
//# sourceMappingURL=index.js.map