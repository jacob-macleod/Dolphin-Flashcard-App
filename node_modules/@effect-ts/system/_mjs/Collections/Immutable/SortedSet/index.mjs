// ets_tracing: off
import "../../../Operator/index.mjs";
import { not } from "../../../Function/index.mjs";
import * as St from "../../../Structural/index.mjs";
import * as RB from "../RedBlackTree/index.mjs";
import * as Tp from "../Tuple/index.mjs";
export class SortedSet {
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
export function make(K) {
  return new SortedSet(RB.make(K));
}
export function add_(set, v) {
  return RB.has_(set.keyTree, v) ? set : new SortedSet(RB.insert_(set.keyTree, v, true));
}
export function add(v) {
  return set => add_(set, v);
}
export function remove_(set, v) {
  return new SortedSet(RB.removeFirst_(set.keyTree, v));
}
export function remove(v) {
  return set => remove_(set, v);
}
export function values(set) {
  return RB.keys_(set.keyTree);
}
export function has_(set, v) {
  return RB.has_(set.keyTree, v);
}
/**
 * Apply f to each element
 */

export function forEach_(map, f) {
  RB.forEach_(map.keyTree, k => {
    f(k);
  });
}
/**
 * The set of elements which are in both the first and second set,
 *
 * the hash and equal of the 2 sets has to be the same
 */

export function intersection_(l, r) {
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

export function intersection(r) {
  return l => intersection_(l, r);
}
/**
 * Projects a Set through a function
 */

export function map_(E) {
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

export function map(E) {
  const m = map_(E);
  return f => set => m(set, f);
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
  return RB.size(set.keyTree);
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

export function chain(E) {
  const c = chain_(E);
  return f => set => c(set, f);
}
/**
 * Map + Flatten
 */

export function chain_(E) {
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
export function partition(predicate) {
  return set => partition_(set, predicate);
}
export function partition_(set, predicate) {
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

export function difference_(x, y) {
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

export function difference(y) {
  return x => difference_(x, y);
}
/**
 * Reduce a state over the map entries
 */

export function reduce_(set, z, f) {
  return RB.reduceWithIndex_(set.keyTree, z, (z, v) => f(z, v));
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

export function union(y) {
  return x => union_(x, y);
}
//# sourceMappingURL=index.mjs.map