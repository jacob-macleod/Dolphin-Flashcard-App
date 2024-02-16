// ets_tracing: off
import * as I from "../../../Iterable/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as St from "../../../Structural/index.mjs";
import { AtomicNumber } from "../../../Support/AtomicNumber/index.mjs";
export const HashMapTypeId = /*#__PURE__*/Symbol();

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


export class HashMap {
  constructor() {
    this._typeId = HashMapTypeId;
    this.backingMap = new Map();
    this.length = new AtomicNumber(0);
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

export function make() {
  return new HashMap();
}
/**
 * Creates a new map from an Iterable
 */

export function from(xs) {
  const res = make();

  for (const p of xs) {
    res.set(...p);
  }

  return res;
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */

export function get_(map, key) {
  return map.get(key);
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 *
 * @ets_data_first get_
 */

export function get(key) {
  return map => get_(map, key);
}
/**
 * Store `value` for `key` in `map` using internal hash function.
 */

export function set_(map, key, value) {
  return map.set(key, value);
}
/**
 * Store `value` for `key` in `map` using internal hash function.
 *
 * @ets_data_first set_
 */

export function set(key, value) {
  return map => set_(map, key, value);
}
/**
 * Remove the entry for `key` in `map` using internal hash.
 */

export function remove_(map, key) {
  return map.remove(key);
}
/**
 * Remove the entry for `key` in `map` using internal hash.
 *
 * @ets_data_first remove_
 */

export function remove(key) {
  return map => remove_(map, key);
}
/**
 * Calculate the number of key/value pairs in a map
 */

export function size(map) {
  return map.length.get;
}
/**
 * Update a value if exists
 */

export function update_(map, key, f) {
  return map.update(key, f);
}
/**
 * Update a value if exists
 *
 * @ets_data_first update_
 */

export function update(key, f) {
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

export function modify_(map, key, f) {
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

export function modify(key, f) {
  return map => modify_(map, key, f);
}
//# sourceMappingURL=index.mjs.map