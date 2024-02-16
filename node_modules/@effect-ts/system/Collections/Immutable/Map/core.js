"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compact = compact;
exports.copy = copy;
exports.empty = void 0;
exports.filterMap = filterMap;
exports.filterMapWithIndex = filterMapWithIndex;
exports.filterMapWithIndex_ = filterMapWithIndex_;
exports.filterMap_ = filterMap_;
exports.filterWithIndex = filterWithIndex;
exports.filterWithIndex_ = filterWithIndex_;
exports.fromMutable = fromMutable;
exports.insert = insert;
exports.insert_ = insert_;
exports.isEmpty = isEmpty;
exports.lookup = lookup;
exports.lookup_ = lookup_;
exports.make = make;
exports.map = map;
exports.mapWithIndex = mapWithIndex;
exports.mapWithIndex_ = mapWithIndex_;
exports.map_ = map_;
exports.remove = remove;
exports.removeMany = removeMany;
exports.removeMany_ = removeMany_;
exports.remove_ = remove_;
exports.singleton = singleton;
exports.size = size;
exports.toMutable = toMutable;

var Op = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Option/index.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */

/* eslint-disable @typescript-eslint/no-non-null-assertion */

/**
 * Create from a key-value array
 */
function make(values) {
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


function compact(fa) {
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


const empty = /*#__PURE__*/new Map();
/**
 * Filter out None and map
 */

exports.empty = empty;

function filterMap_(fa, f) {
  return filterMapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Filter out None and map
 */


function filterMap(f) {
  return fa => filterMap_(fa, f);
}
/**
 * Filter out None and map
 */


function filterMapWithIndex_(fa, f) {
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


function filterMapWithIndex(f) {
  return fa => filterMapWithIndex_(fa, f);
}
/**
 * Filter out None and map
 */


function filterWithIndex_(fa, p) {
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


function filterWithIndex(p) {
  return fa => filterWithIndex_(fa, p);
}
/**
 * Construct a new Readonly Map
 */


function fromMutable(m) {
  return new Map(m);
}
/**
 * Test whether or not a map is empty
 */


function isEmpty(d) {
  return d.size === 0;
}
/**
 * Maps values using f
 */


function map_(fa, f) {
  return mapWithIndex_(fa, (_, a) => f(a));
}
/**
 * Maps values using f
 */


function map(f) {
  return fa => map_(fa, f);
}
/**
 * Maps values using f
 */


function mapWithIndex_(fa, f) {
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


function mapWithIndex(f) {
  return fa => mapWithIndex_(fa, f);
}
/**
 * Create a map with one key/value pair
 */


function singleton(k, a) {
  return new Map([[k, a]]);
}
/**
 * Calculate the number of key/value pairs in a map
 */


function size(d) {
  return d.size;
}
/**
 * Construct a new mutable map by copying this one
 */


function toMutable(m) {
  return new Map(m);
}

function insert_(self, k, v) {
  const m = copy(self);
  m.set(k, v);
  return m;
}

function insert(k, v) {
  return self => insert_(self, k, v);
}

function remove_(self, k) {
  const m = copy(self);
  m.delete(k);
  return m;
}

function remove(k) {
  return self => remove_(self, k);
}

function removeMany_(self, ks) {
  const m = copy(self);

  for (const k of ks) {
    m.delete(k);
  }

  return m;
}

function removeMany(ks) {
  return self => removeMany_(self, ks);
}

function lookup_(m, k) {
  return (0, Op.fromNullable)(m.get(k));
}

function lookup(k) {
  return m => lookup_(m, k);
}

function copy(self) {
  const m = new Map();
  self.forEach((v, k) => {
    m.set(k, v);
  });
  return m;
}
//# sourceMappingURL=core.js.map