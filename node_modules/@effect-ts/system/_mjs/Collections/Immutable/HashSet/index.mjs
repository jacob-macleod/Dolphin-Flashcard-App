// ets_tracing: off
import "../../../Operator/index.mjs";
import { not } from "../../../Function/index.mjs";
import * as I from "../../../Iterable/index.mjs";
import * as St from "../../../Structural/index.mjs";
import * as HM from "../HashMap/core.mjs";
import * as Tp from "../Tuple/index.mjs";
export class HashSet {
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
export function make() {
  return new HashSet(HM.make());
}
/**
 * Creates a new set from an Iterable
 */

export function from(xs) {
  return I.reduce_(xs, make(), (s, v) => add_(s, v));
}
export function add_(set, v) {
  return set.keyMap.editable ? (HM.set_(set.keyMap, v, true), set) : new HashSet(HM.set_(set.keyMap, v, true));
}
export function add(v) {
  return set => add_(set, v);
}
export function remove_(set, v) {
  return set.keyMap.editable ? (HM.remove_(set.keyMap, v), set) : new HashSet(HM.remove_(set.keyMap, v));
}
export function remove(v) {
  return set => remove_(set, v);
}
export function values(set) {
  return HM.keys(set.keyMap);
}
export function has_(set, v) {
  return HM.has_(set.keyMap, v);
}
/**
 * Apply f to each element
 */

export function forEach_(map, f) {
  HM.forEachWithIndex_(map.keyMap, k => {
    f(k);
  });
}
/**
 * Mutate `set` within the context of `f`.
 */

export function mutate_(set, transient) {
  const s = beginMutation(set);
  transient(s);
  return endMutation(s);
}
/**
 * The set of elements which are in both the first and second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */

export function intersection_(l, r) {
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

export function intersection(r) {
  return l => intersection_(l, r);
}
/**
 * Projects a Set through a function
 */

export function map_(set, f) {
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

export function map(f) {
  return set => map_(set, f);
}
/**
 * true if one or more elements match predicate
 *
 * @ets_data_first some_
 */

export function some(predicate) {
  return set => some_(set, predicate);
}
/**
 * true if one or more elements match predicate
 */

export function some_(set, predicate) {
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

export function size(set) {
  return HM.size(set.keyMap);
}
/**
 * Creates an equal for a set
 */

export function equal() {
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

export function every(predicate) {
  return set => every_(set, predicate);
}
/**
 * true if all elements match predicate
 */

export function every_(set, predicate) {
  return not(some(not(predicate)))(set);
}
/**
 * Map + Flatten
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return set => chain_(set, f);
}
/**
 * Map + Flatten
 */

export function chain_(set, f) {
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

export function isSubset(y) {
  return x => isSubset_(y, x);
}
/**
 * `true` if and only if every element in the first set is an element of the second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */

export function isSubset_(x, y) {
  return every_(x, a => has_(y, a));
}
export function filter(predicate) {
  return set => filter_(set, predicate);
}
export function filter_(set, predicate) {
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
export function partition(predicate) {
  return set => partition_(set, predicate);
}
export function partition_(set, predicate) {
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

export function beginMutation(set) {
  return new HashSet(HM.beginMutation(set.keyMap));
}
/**
 * Mark `set` as immutable.
 */

export function endMutation(set) {
  set.keyMap.editable = false;
  return set;
}
/**
 * Form the set difference (`x` - `y`)
 */

export function difference_(x, y) {
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

export function difference(y) {
  return x => difference_(x, y);
}
/**
 * Reduce a state over the map entries
 */

export function reduce_(set, z, f) {
  return HM.reduceWithIndex_(set.keyMap, z, (z, v) => f(z, v));
}
/**
 * Reduce a state over the map entries
 *
 * @ets_data_first reduce_
 */

export function reduce(z, f) {
  return set => reduce_(set, z, f);
}
/**
 * If element is present remove it, if not add it
 *
 * @ets_data_first toggle_
 */

export function toggle(a) {
  return set => toggle_(set, a);
}
/**
 * If element is present remove it, if not add it
 */

export function toggle_(set, a) {
  return (has_(set, a) ? remove : add)(a)(set);
}
/**
 * Form the union of two sets,
 *
 * the hash and equal of the 2 sets has to be the same
 */

export function union_(l, r) {
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

export function union(y) {
  return x => union_(x, y);
}
//# sourceMappingURL=index.mjs.map