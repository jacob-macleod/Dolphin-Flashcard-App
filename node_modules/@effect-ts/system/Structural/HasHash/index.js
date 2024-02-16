"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._combineHash = _combineHash;
exports._hash = _hash;
exports._hashArray = _hashArray;
exports._hashIterator = _hashIterator;
exports._hashMiscRef = _hashMiscRef;
exports._hashNumber = _hashNumber;
exports._hashObject = _hashObject;
exports._hashPlainObject = _hashPlainObject;
exports._hashString = _hashString;
exports.combineHash = combineHash;
exports.hasHash = hasHash;
exports.hash = hash;
exports.hashArgs = hashArgs;
exports.hashArray = hashArray;
exports.hashIterator = hashIterator;
exports.hashMiscRef = hashMiscRef;
exports.hashNumber = hashNumber;
exports.hashObject = hashObject;
exports.hashPlainObject = hashPlainObject;
exports.hashString = hashString;
exports.hashSym = void 0;
exports.hashUnknown = hashUnknown;
exports.isDefined = isDefined;
exports.isIterable = isIterable;
exports.opt = opt;
exports.randomInt = randomInt;

var _index = /*#__PURE__*/require("../../Random/PCG/index.js");

// ets_tracing: off
// forked from https://github.com/frptools
const hashSym = /*#__PURE__*/Symbol();
exports.hashSym = hashSym;

function hasHash(u) {
  return typeof u === "object" && u !== null && hashSym in u;
}

let _current = 0;

function opt(n) {
  return n & 0xbfffffff | n >>> 1 & 0x40000000;
}

function hash(arg) {
  return opt(_hash(arg));
}

function hashUnknown(arg) {
  return opt(_hash(arg));
}

function hashArray(arr) {
  return opt(_hashArray(arr));
}

function hashArgs() {
  let h = 5381;

  for (let i = 0; i < arguments.length; i++) {
    // eslint-disable-next-line prefer-rest-params
    h = _combineHash(h, hash(arguments[i]));
  }

  return opt(h);
}

function combineHash(a, b) {
  return opt(_combineHash(a, b));
}

function hashObject(value) {
  return opt(_hashObject(value));
}

function hashMiscRef(o) {
  return opt(_hashMiscRef(o));
}

function hashIterator(it) {
  return opt(_hashIterator(it));
}

function hashPlainObject(o) {
  return opt(_hashPlainObject(o));
}

function hashNumber(n) {
  return opt(_hashNumber(n));
}

function hashString(str) {
  return opt(_hashString(str));
}

function isZero(value) {
  return value === null || value === void 0 || value === false;
}

const RANDOM = /*#__PURE__*/new _index.PCGRandom( /*#__PURE__*/Math.random() * 4294967296 >>> 0);
const CACHE = /*#__PURE__*/new WeakMap();

function randomInt() {
  return RANDOM.integer(0x7fffffff);
}

function _hash(arg) {
  if (isZero(arg)) return 0;

  if (typeof arg.valueOf === "function" && arg.valueOf !== Object.prototype.valueOf) {
    arg = arg.valueOf();
    if (isZero(arg)) return 0;
  }

  switch (typeof arg) {
    case "number":
      return _hashNumber(arg);

    case "string":
      return _hashString(arg);

    case "function":
      return _hashMiscRef(arg);

    case "object":
      return _hashObject(arg);

    case "boolean":
      return arg === true ? 1 : 0;

    case "symbol":
      return _hashString(String(arg));

    case "bigint":
      return _hashString(arg.toString(10));

    case "undefined":
      {
        return 0;
      }
  }
}

function _hashArray(arr) {
  let h = 6151;

  for (let i = 0; i < arr.length; i++) {
    h = _combineHash(h, _hash(arr[i]));
  }

  return h;
}

function _combineHash(a, b) {
  return a * 53 ^ b;
}

function isDefined(value) {
  return value !== void 0;
}

function isIterable(value) {
  return Symbol.iterator in value;
}

function _hashObject(value) {
  if (hasHash(value)) {
    return value[hashSym];
  } else {
    let h = CACHE.get(value);
    if (isDefined(h)) return h;
    h = _current++;
    CACHE.set(value, h);
    return h;
  }
}

function _hashMiscRef(o) {
  let h = CACHE.get(o);
  if (isDefined(h)) return h;
  h = randomInt();
  CACHE.set(o, h);
  return h;
}

function _hashIterator(it) {
  let h = 6151;
  let current;

  while (!(current = it.next()).done) {
    h = _combineHash(h, hash(current.value));
  }

  return h;
}

function _hashPlainObject(o) {
  CACHE.set(o, randomInt());
  const keys = Object.keys(o).sort();
  let h = 12289;

  for (let i = 0; i < keys.length; i++) {
    h = _combineHash(h, _hashString(keys[i]));
    h = _combineHash(h, hash(o[keys[i]]));
  }

  return h;
}

function _hashNumber(n) {
  if (n !== n || n === Infinity) return 0;
  let h = n | 0;
  if (h !== n) h ^= n * 0xffffffff;

  while (n > 0xffffffff) h ^= n /= 0xffffffff;

  return n;
}

function _hashString(str) {
  let h = 5381,
      i = str.length;

  while (i) h = h * 33 ^ str.charCodeAt(--i);

  return h;
}
//# sourceMappingURL=index.js.map