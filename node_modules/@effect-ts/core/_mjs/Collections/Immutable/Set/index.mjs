// ets_tracing: off
import "../../../Operator/index.mjs";
import { makeAssociative } from "../../../Associative/index.mjs";
import { makeEqual } from "../../../Equal/index.mjs";
import { identity, not } from "../../../Function/index.mjs";
import { makeIdentity } from "../../../Identity/index.mjs";
import * as Tp from "../Tuple/index.mjs";
export const empty = /*#__PURE__*/new Set();
/**
 * Get an Associative that performs Set intersection
 */

export function getIntersectionAssociative(E) {
  return makeAssociative(intersection_(E));
}
/**
 * Get an Identity that performs Set union
 */

export function getUnionIdentity(E) {
  return makeIdentity(empty, union_(E));
}
/**
 * The set of elements which are in both the first and second set
 */

export function intersection_(E) {
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

export function intersection(E) {
  const i = intersection_(E);
  return x => y => i(x, y);
}
/**
 * Convert a mutable set to a readonly one
 */

export function fromMutable(s) {
  return new Set(s);
}
/**
 * Convert a set to a mutable one
 */

export function toMutable(s) {
  return new Set(s);
}
/**
 * get Show for set given Show for values
 */

export function getShow(S) {
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

export function toArray(O) {
  return x => {
    const r = [];
    x.forEach(e => r.push(e));
    return r.sort(O.compare);
  };
}
/**
 * Convert a set to an Array
 */

export function toArray_(x, O) {
  return toArray(O)(x);
}
/**
 * Get Equal for Setgiven Equal for element
 */

export function getEqual(E) {
  const subsetE = isSubset_(E);
  return makeEqual((x, y) => subsetE(x, y) && subsetE(y, x));
}
/**
 * true if one or more elements match predicate
 */

export function some(predicate) {
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

export function some_(set, predicate) {
  return some(predicate)(set);
}
/**
 * Projects a Set through a function
 */

export function map(E) {
  const m = map_(E);
  return f => set => m(set, f);
}
/**
 * Projects a Set through a function
 */

export function map_(E) {
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
 */

export function chain(E) {
  const c = chain_(E);
  return f => set => c(set, f);
}
/**
 * Map + Flatten
 */

export function chain_(E) {
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

export function isSubset(E) {
  const i = isSubset_(E);
  return y => x => i(y, x);
}
/**
 * `true` if and only if every element in the first set is an element of the second set
 */

export function isSubset_(E) {
  const elemE = elem_(E);
  return (x, y) => every(a => elemE(y, a))(x);
}
export function filter(predicate) {
  return set => filter_(set, predicate);
}
export function filter_(set, predicate) {
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
export function partition(predicate) {
  return set => partition_(set, predicate);
}
export function partition_(set, predicate) {
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

export function elem_(E) {
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

export function elem(E) {
  const e = elem_(E);
  return a => set => e(set, a);
}
/**
 * Partition elements according to f
 */

export function partitionMap(EB, EC) {
  const pm = partitionMap_(EB, EC);
  return f => set => pm(set, f);
}
/**
 * Partition elements according to f
 */

export function partitionMap_(EB, EC) {
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

export function difference_(E) {
  const elemE = elem_(E);
  return (x, y) => filter(a => !elemE(y, a))(x);
}
/**
 * Form the set difference (`x` - `y`)
 */

export function difference(E) {
  const diff = difference_(E);
  return y => x => diff(x, y);
}
/**
 * Reduce over the set values
 */

export function reduce(O) {
  const red = reduce_(O);
  return (b, f) => fa => red(fa, b, f);
}
/**
 * Reduce over the set values
 */

export function reduce_(O) {
  const toArrayO = toArray(O);
  return (fa, b, f) => toArrayO(fa).reduce(f, b);
}
/**
 * Fold + Map
 */

export function foldMap(O, M) {
  const fm = foldMap_(O, M);
  return f => fa => fm(fa, f);
}
/**
 * Fold + Map
 */

export function foldMap_(O, M) {
  const toArrayO = toArray(O);
  return (fa, f) => toArrayO(fa).reduce((b, a) => M.combine(b, f(a)), M.identity);
}
/**
 * Create a set with one element
 */

export function singleton(a) {
  return new Set([a]);
}
/**
 * Insert a value into a set
 */

export function insert(E) {
  const i = insert_(E);
  return a => set => i(set, a);
}
/**
 * Insert a value into a set
 */

export function insert_(E) {
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

export function remove(E) {
  const rem = remove_(E);
  return a => set => rem(set, a);
}
/**
 * Delete a value from a set
 */

export function remove_(E) {
  return (set, a) => filter(ax => !E.equals(a, ax))(set);
}
/**
 * If element is present remove it, if not add it
 */

export function toggle(E) {
  const t = toggle_(E);
  return a => set => t(set, a);
}
/**
 * If element is present remove it, if not add it
 */

export function toggle_(E) {
  const elemE = elem_(E);
  const removeE = remove(E);
  const insertE = insert(E);
  return (set, a) => (elemE(set, a) ? removeE : insertE)(a)(set);
}
/**
 * Create a set from an array
 */

export function fromArray(E) {
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

export function compact(E) {
  return filterMap(E)(identity);
}
/**
 * Separate elements
 */

export function separate(EE, EA) {
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

export function filterMap(E) {
  const fm = filterMap_(E);
  return f => fa => fm(fa, f);
}
/**
 * Filter + Map
 */

export function filterMap_(E) {
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

export function union_(E) {
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

export function union(E) {
  const u = union_(E);
  return y => x => u(x, y);
}
//# sourceMappingURL=index.mjs.map