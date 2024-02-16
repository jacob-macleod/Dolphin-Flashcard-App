// ets_tracing: off
import "../../../Operator/index.mjs";
import * as O from "../../../Option/index.mjs";
import * as A from "../Array/index.mjs";
import * as Tp from "../Tuple/index.mjs";
/**
 * Build a readonly record from a mutable version
 */

export function fromMutable(r) {
  return Object.assign({}, r);
}
/**
 * Converts the record to a mutable version
 */

export function toMutable(r) {
  return Object.assign({}, r);
}
/**
 * Calculate the number of key/value pairs in a record
 */

export function size(r) {
  return Object.keys(r).length;
}
/**
 * Test whether a record is empty
 */

export function isEmpty(r) {
  return Object.keys(r).length === 0;
}
/**
 * Extract record keys
 */

export function keys(r) {
  return Object.keys(r).sort();
}
/**
 * Extract record values
 */

export function values(r) {
  return Object.keys(r).sort().map(s => r[s]);
}
/**
 * Map a record into an array
 */

export function collect(f) {
  return r => collect_(r, f);
}
/**
 * Map a record into an array
 */

export function collect_(r, f) {
  const out = [];

  for (const key of keys(r)) {
    out.push(f(key, r[key]));
  }

  return out;
}
/**
 * Insert or replace a key/value pair in a record
 */

export function insertAt(k, a) {
  return r => insertAt_(r, k, a);
}
/**
 * Insert or replace a key/value pair in a record
 */

export function insertAt_(r, k, a) {
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

export function hasOwnProperty(r, k) {
  return Object.prototype.hasOwnProperty.call(r, k);
}
/**
 * Delete a key
 */

export function deleteAt(k) {
  return r => deleteAt_(r, k);
}
/**
 * Delete a key
 */

export function deleteAt_(r, k) {
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

export function updateAt(k, a) {
  return r => updateAt_(r, k, a);
}
/**
 * Update a key value pair
 */

export function updateAt_(r, k, a) {
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

export function modifyAt(k, f) {
  return r => modifyAt_(r, k, f);
}
/**
 * Modify the value at key k with f
 */

export function modifyAt_(r, k, f) {
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

export function pop(k) {
  return r => pop_(r, k);
}
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 */

export function pop_(r, k) {
  const deleteAtk = deleteAt(k);
  const oa = lookup_(r, k);
  return O.isNone(oa) ? O.none : O.some(Tp.tuple(oa.value, deleteAtk(r)));
}
/**
 * Lookup the value for a key in a record
 */

export function lookup_(r, k) {
  return Object.prototype.hasOwnProperty.call(r, k) ? O.some(r[k]) : O.none;
}
/**
 * Lookup the value for a key in a record
 */

export function lookup(k) {
  return r => Object.prototype.hasOwnProperty.call(r, k) ? O.some(r[k]) : O.none;
}
/**
 * Empty record
 */

export const empty = {};
/**
 * Map a record passing the keys to the iterating function
 */

export function mapWithIndex(f) {
  return fa => mapWithIndex_(fa, f);
}
/**
 * Map a record passing the keys to the iterating function
 */

export function mapWithIndex_(fa, f) {
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

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * Map a record passing the values to the iterating function
 */

export function map_(fa, f) {
  return mapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Reduce the record passing the index toghether with the value to f
 */

export function reduceWithIndex(b, f) {
  return fa => reduceWithIndex_(fa, b, f);
}
/**
 * Reduce the record passing the index toghether with the value to f
 */

export function reduceWithIndex_(fa, b, f) {
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

export function reduceRightWithIndex(b, f) {
  return fa => reduceRightWithIndex_(fa, b, f);
}
/**
 * Reduce the record passing the index toghether with the value to f
 *
 * Inverted order
 */

export function reduceRightWithIndex_(fa, b, f) {
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

export function singleton(k, a) {
  return {
    [k]: a
  };
}
/**
 * Partition a record using f that also consumes the entry key
 */

export function partitionMapWithIndex(f) {
  return fa => partitionMapWithIndex_(fa, f);
}
/**
 * Partition a record using f that also consumes the entry key
 */

export function partitionMapWithIndex_(fa, f) {
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
export function partitionWithIndex(predicateWithIndex) {
  return fa => partitionWithIndex_(fa, predicateWithIndex);
}
export function partitionWithIndex_(fa, predicateWithIndex) {
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
export function filterMapWithIndex(f) {
  return fa => filterMapWithIndex_(fa, f);
}
/**
 * Filter & map the record entries with f that consumes also the entry index
 */

export function filterMapWithIndex_(fa, f) {
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
export function filterWithIndex(predicateWithIndex) {
  return fa => filterWithIndex_(fa, predicateWithIndex);
}
export function filterWithIndex_(fa, predicateWithIndex) {
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

export function every(predicate) {
  return r => every_(r, predicate);
}
/**
 * Checks a predicate against all the record entries
 */

export function every_(r, predicate) {
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

export function some(predicate) {
  return r => some_(r, predicate);
}
/**
 * Checks a predicate against some of the record entries
 */

export function some_(r, predicate) {
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

export const compact = fa => {
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

export const separate = fa => {
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

export const filter = predicate => fa => filter_(fa, predicate);
/**
 * Filter record entries according to a predicate
 */

export const filter_ = (fa, predicate) => filterWithIndex_(fa, (_, a) => predicate(a));
/**
 * Filter & map record entries according to a predicate
 */

export const filterMap = f => fa => filterMap_(fa, f);
/**
 * Filter & map record entries according to a predicate
 */

export const filterMap_ = (fa, f) => filterMapWithIndex_(fa, (_, a) => f(a));
/**
 * Partition record entries according to a predicate
 */

export const partition = predicate => fa => partition_(fa, predicate);
/**
 * Partition record entries according to a predicate
 */

export const partition_ = (fa, predicate) => partitionWithIndex_(fa, (_, a) => predicate(a));
/**
 * Partition & map record entries
 */

export const partitionMap = f => fa => partitionMap_(fa, f);
/**
 * Partition & map record entries
 */

export const partitionMap_ = (fa, f) => partitionMapWithIndex_(fa, (_, a) => f(a));
/**
 * Reduce record entries
 */

export const reduce = (b, f) => fa => reduce_(fa, b, f);
/**
 * Reduce record entries
 */

export const reduce_ = (fa, b, f) => reduceWithIndex_(fa, b, (_, b, a) => f(b, a));
/**
 * Reduce record entries in inverted order
 */

export const reduceRight = (b, f) => fa => reduceRight_(fa, b, f);
/**
 * Reduce record entries in inverted order
 */

export const reduceRight_ = (fa, b, f) => reduceRightWithIndex_(fa, b, (_, a, b) => f(a, b));
/**
 * Converts a record into an array of [key, value]
 */

export const toArray = /*#__PURE__*/collect(Tp.tuple);
/**
 * Converts an array of [key, value] into a record
 */

export const fromArray = _ => A.reduce_(_, {}, (b, {
  tuple: [k, v]
}) => Object.assign(b, {
  [k]: v
}));
//# sourceMappingURL=index.mjs.map