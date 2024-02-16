// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Op from "../../../Option/index.mjs";
import { fromNullable } from "../../../Option/index.mjs";
import * as Tp from "../Tuple/index.mjs";
/**
 * Create from a key-value array
 */

export function make(values) {
  const map = new Map();

  for (const _ of values) {
    if (Tp.isTuple(_)) {
      map.set(_.get(0), _.get(1));
    } else {
      map.set(_[0], _[1]);
    }
  }

  return map;
}
/**
 * Removes None values
 */

export function compact(fa) {
  const m = new Map();
  const entries = fa.entries();
  let e;

  while (!(e = entries.next()).done) {
    const [k, oa] = e.value;

    if (Op.isSome(oa)) {
      m.set(k, oa.value);
    }
  }

  return m;
}
/**
 * Empty Map
 */

export const empty = /*#__PURE__*/new Map();
/**
 * Filter out None and map
 */

export function filterMap_(fa, f) {
  return filterMapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Filter out None and map
 */

export function filterMap(f) {
  return fa => filterMap_(fa, f);
}
/**
 * Filter out None and map
 */

export function filterMapWithIndex_(fa, f) {
  const m = new Map();
  const entries = fa.entries();
  let e; // tslint:disable-next-line: strict-boolean-expressions

  while (!(e = entries.next()).done) {
    const [k, a] = e.value;
    const o = f(k, a);

    if (Op.isSome(o)) {
      m.set(k, o.value);
    }
  }

  return m;
}
/**
 * Filter out None and map
 */

export function filterMapWithIndex(f) {
  return fa => filterMapWithIndex_(fa, f);
}
/**
 * Filter out None and map
 */

export function filterWithIndex_(fa, p) {
  const m = new Map();
  const entries = fa.entries();
  let e; // tslint:disable-next-line: strict-boolean-expressions

  while (!(e = entries.next()).done) {
    const [k, a] = e.value;

    if (p(k, a)) {
      m.set(k, a);
    }
  }

  return m;
}
/**
 * Filter out None and map
 */

export function filterWithIndex(p) {
  return fa => filterWithIndex_(fa, p);
}
/**
 * Construct a new Readonly Map
 */

export function fromMutable(m) {
  return new Map(m);
}
/**
 * Test whether or not a map is empty
 */

export function isEmpty(d) {
  return d.size === 0;
}
/**
 * Maps values using f
 */

export function map_(fa, f) {
  return mapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Maps values using f
 */

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * Maps values using f
 */

export function mapWithIndex_(fa, f) {
  const m = new Map();
  const entries = fa.entries();
  let e;

  while (!(e = entries.next()).done) {
    const [key, a] = e.value;
    m.set(key, f(key, a));
  }

  return m;
}
/**
 * Maps values using f
 */

export function mapWithIndex(f) {
  return fa => mapWithIndex_(fa, f);
}
/**
 * Create a map with one key/value pair
 */

export function singleton(k, a) {
  return new Map([[k, a]]);
}
/**
 * Calculate the number of key/value pairs in a map
 */

export function size(d) {
  return d.size;
}
/**
 * Construct a new mutable map by copying this one
 */

export function toMutable(m) {
  return new Map(m);
}
export function insert_(self, k, v) {
  const m = copy(self);
  m.set(k, v);
  return m;
}
export function insert(k, v) {
  return self => insert_(self, k, v);
}
export function remove_(self, k) {
  const m = copy(self);
  m.delete(k);
  return m;
}
export function remove(k) {
  return self => remove_(self, k);
}
export function removeMany_(self, ks) {
  const m = copy(self);

  for (const k of ks) {
    m.delete(k);
  }

  return m;
}
export function removeMany(ks) {
  return self => removeMany_(self, ks);
}
export function lookup_(m, k) {
  return fromNullable(m.get(k));
}
export function lookup(k) {
  return m => lookup_(m, k);
}
export function copy(self) {
  const m = new Map();
  self.forEach((v, k) => {
    m.set(k, v);
  });
  return m;
}
//# sourceMappingURL=core.mjs.map