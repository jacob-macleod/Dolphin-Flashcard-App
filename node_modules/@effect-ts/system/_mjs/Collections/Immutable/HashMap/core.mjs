// ets_tracing: off
import "../../../Operator/index.mjs";
import { constant, identity, tuple } from "../../../Function/index.mjs";
import { NoSuchElementException } from "../../../GlobalExceptions/index.mjs";
import * as I from "../../../Iterable/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as St from "../../../Structural/index.mjs";
import * as Tp from "../Tuple/index.mjs";
import { fromBitmap, hashFragment, toBitmap } from "./Bitwise/index.mjs";
import { SIZE } from "./Config/index.mjs";
import { Empty, isEmptyNode } from "./Nodes/index.mjs";
const HashMapHash = /*#__PURE__*/St.hashString("HashMap");
export class HashMap {
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
    return new HashMapIterator(this, identity);
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
export class HashMapIterator {
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

export function make() {
  return new HashMap(false, 0, new Empty(), 0);
}
/**
 * Creates a new map from an Iterable
 */

export function from(xs) {
  return I.reduce_(xs, make(), (m, p) => set_(m, ...p));
}
/**
 * Set the root of the map
 */

export function setTree_(map, newRoot, newSize) {
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

export function tryGetHash_(map, key, hash) {
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
        const frag = hashFragment(shift, hash);
        const bit = toBitmap(frag);

        if (node.mask & bit) {
          node = node.children[fromBitmap(node.mask, bit)];
          shift += SIZE;
          break;
        }

        return O.none;
      }

    case "ArrayNode":
      {
        node = node.children[hashFragment(shift, hash)];

        if (node) {
          shift += SIZE;
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

export function getHash_(map, key, hash) {
  return tryGetHash_(map, key, hash);
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */

export function unsafeGet_(map, key) {
  const element = tryGetHash_(map, key, St.hash(key));

  if (O.isNone(element)) {
    throw new NoSuchElementException();
  }

  return element.value;
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 *
 * @ets_data_first unsafeGet_
 */

export function unsafeGet(key) {
  return map => unsafeGet_(map, key);
}
/**
 * Lookup the value for `key` in `map` using internal hash function.
 */

export function get_(map, key) {
  return tryGetHash_(map, key, St.hash(key));
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
 * Does an entry exist for `key` in `map`? Uses custom `hash`.
 */

export function hasHash_(map, key, hash) {
  return O.isSome(tryGetHash_(map, key, hash));
}
/**
 * Does an entry exist for `key` in `map`? Uses internal hash function.
 */

export function has_(map, key) {
  return O.isSome(tryGetHash_(map, key, St.hash(key)));
}
/**
 * Does an entry exist for `key` in `map`? Uses internal hash function.
 *
 * @ets_data_first has_
 */

export function has(key) {
  return map => has_(map, key);
}
/**
 * Does `map` contain any elements?
 */

export function isEmpty(map) {
  return map && !!isEmptyNode(map.root);
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

export function modifyHash_(map, key, hash, f) {
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

export function modify_(map, key, f) {
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

export function modify(key, f) {
  return map => modify_(map, key, f);
}
/**
 * Store `value` for `key` in `map` using internal hash function.
 */

export function set_(map, key, value) {
  return modify_(map, key, constant(O.some(value)));
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
  return modify_(map, key, constant(O.none));
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
 * Mark `map` as mutable.
 */

export function beginMutation(map) {
  return new HashMap(true, map.edit + 1, map.root, map.size);
}
/**
 * Mark `map` as immutable.
 */

export function endMutation(map) {
  map.editable = false;
  return map;
}
/**
 * Mutate `map` within the context of `f`.
 *
 * @ets_data_first mutate_
 */

export function mutate(f) {
  return map => mutate_(map, f);
}
/**
 * Mutate `map` within the context of `f`.
 */

export function mutate_(map, f) {
  const transient = beginMutation(map);
  f(transient);
  return endMutation(transient);
}
export function applyCont(cont) {
  return cont ? visitLazyChildren(cont[0], cont[1], cont[2], cont[3], cont[4]) : O.none;
}
export function visitLazyChildren(len, children, i, f, cont) {
  while (i < len) {
    const child = children[i++];

    if (child && !isEmptyNode(child)) {
      return visitLazy(child, f, [len, children, i, f, cont]);
    }
  }

  return applyCont(cont);
}
/**
 * Visit each leaf lazily
 */

export function visitLazy(node, f, cont = undefined) {
  switch (node._tag) {
    case "LeafNode":
      {
        return O.isSome(node.value) ? O.some({
          value: f(tuple(node.key, node.value.value)),
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

export function keys(map) {
  return new HashMapIterator(map, ([k]) => k);
}
/**
 * Get an IterableIterator of the map values
 */

export function values(map) {
  return new HashMapIterator(map, ([, v]) => v);
}
/**
 * Update a value if exists
 */

export function update_(map, key, f) {
  return modify_(map, key, O.map(f));
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
 * Reduce a state over the map entries
 */

export function reduceWithIndex_(map, z, f) {
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

      if (child && !isEmptyNode(child)) {
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

export function reduceWithIndex(z, f) {
  return map => reduceWithIndex_(map, z, f);
}
/**
 * Reduce a state over the map entries
 */

export function reduce_(map, z, f) {
  return reduceWithIndex_(map, z, (z, _, v) => f(z, v));
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */

export function reduce(z, f) {
  return map => reduce_(map, z, f);
}
/**
 * Apply f to each element
 */

export function forEachWithIndex_(map, f) {
  reduceWithIndex_(map, undefined, (_, key, value) => f(key, value));
}
/**
 * Apply f to each element
 *
 * @ets_data_first forEachWithIndex_
 */

export function forEachWithIndex(f) {
  return map => forEachWithIndex_(map, f);
}
/**
 * Apply f to each element
 */

export function forEach_(map, f) {
  forEachWithIndex_(map, (_, value) => f(value));
}
/**
 * Apply f to each element
 *
 * @ets_data_first forEach_
 */

export function forEach(f) {
  return map => forEach_(map, f);
}
/**
 * Maps over the map entries
 */

export function mapWithIndex_(map, f) {
  return reduceWithIndex_(map, make(), (z, k, v) => set_(z, k, f(k, v)));
}
/**
 * Maps over the map entries
 *
 * @ets_data_first mapWithIndex_
 */

export function mapWithIndex(f) {
  return map => mapWithIndex_(map, f);
}
/**
 * Maps over the map entries
 */

export function map_(map, f) {
  return reduceWithIndex_(map, make(), (z, k, v) => set_(z, k, f(v)));
}
/**
 * Maps over the map entries
 *
 * @ets_data_first map_
 */

export function map(f) {
  return map => map_(map, f);
}
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 */

export function chain_(map, f) {
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

export function chain(f) {
  return map => chain_(map, f);
}
/**
 * Chain over the map entries, the hash and equal of the 2 maps has to be the same
 */

export function chainWithIndex_(map, f) {
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

export function chainWithIndex(f) {
  return map => chainWithIndex_(map, f);
}
/**
 * Removes None values
 */

export function compact(fa) {
  return filterMapWithIndex_(fa, (_, a) => a);
}
/**
 * Filter out None and map
 */

export function filterMapWithIndex_(fa, f) {
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

export function filterMapWithIndex(f) {
  return fa => filterMapWithIndex_(fa, f);
}
/**
 * Filter out None and map
 */

export function filterMap_(fa, f) {
  return filterMapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Filter out None and map
 *
 * @ets_data_first filterMap_
 */

export function filterMap(f) {
  return fa => filterMap_(fa, f);
}
/**
 * Filter out by predicate
 */

export function filterWithIndex_(fa, p) {
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

export function filterWithIndex(p) {
  return fa => filterWithIndex_(fa, p);
}
export function filter_(fa, p) {
  return filterWithIndex_(fa, (_, a) => p(a));
}
export function filter(p) {
  return fa => filter_(fa, p);
}
/**
 * Calculate the number of key/value pairs in a map
 */

export function size(map) {
  return map.size;
}
/**
 * Remove many keys
 */

export function removeMany_(self, ks) {
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

export function removeMany(ks) {
  return self => removeMany_(self, ks);
}
//# sourceMappingURL=core.mjs.map