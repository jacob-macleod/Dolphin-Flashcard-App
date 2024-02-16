"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TupleSym = exports.Tuple = void 0;
exports.append = append;
exports.append_ = append_;
exports.concat = concat;
exports.concat_ = concat_;
exports.fromNative = fromNative;
exports.get = get;
exports.get_ = get_;
exports.isTuple = isTuple;
exports.prepend = prepend;
exports.prepend_ = prepend_;
exports.toNative = toNative;
exports.tuple = tuple;
exports.update = update;
exports.update_ = update_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off
const TupleSym = /*#__PURE__*/Symbol.for("@effect-ts/system/Collections/Immutable/Tuple");
exports.TupleSym = TupleSym;

function isTuple(self) {
  return typeof self === "object" && self != null && TupleSym in self;
}

class Tuple {
  constructor(tuple) {
    this.tuple = tuple;
  }

  [TupleSym]() {
    return TupleSym;
  }

  [Symbol.iterator]() {
    return this.tuple[Symbol.iterator]();
  }

  get [Tp.hashSym]() {
    return Tp.hashArray(this.tuple);
  }

  [Tp.equalsSym](that) {
    if (isTuple(that)) {
      return this.tuple.length === that.tuple.length && this.tuple.every((v, i) => Tp.equals(v, that.tuple[i]));
    }

    return false;
  }

  get(i) {
    return this.tuple[i];
  }

}
/**
 * Creates a new Tuple
 */


exports.Tuple = Tuple;

function tuple(...args) {
  return new Tuple(args);
}
/**
 * Gets an element from the tuple
 *
 * @ets_data_first get_
 */


function get(i) {
  return self => self.get(i);
}
/**
 * Gets an element from the tuple
 */


function get_(self, i) {
  return self.get(i);
}
/**
 * Converts to native tuple type
 */


function toNative(self) {
  return self.tuple;
}
/**
 * Converts from native tuple type
 */


function fromNative(self) {
  return new Tuple(self);
}
/**
 * Replaces the element in position I
 *
 * @ets_data_first update_
 */


function update(i, f) {
  return self => update_(self, i, f);
}
/**
 * Replaces the element in position I
 */


function update_(self, i, f) {
  const len = self.tuple.length;
  const r = new Array(len);

  for (let k = 0; k < len; k++) {
    if (k === i) {
      r[k] = f(self.tuple[k]);
    } else {
      r[k] = self.tuple[k];
    }
  }

  return new Tuple(r);
}
/**
 * Appends a value to a tuple
 *
 * @ets_data_first append_
 */


function append(k) {
  return self => append_(self, k);
}
/**
 * Appends a value to a tuple
 */


function append_(self, k) {
  return new Tuple([...self.tuple, k]);
}
/**
 * Appends a value to a tuple
 *
 * @ets_data_first prepend_
 */


function prepend(k) {
  return self => prepend_(self, k);
}
/**
 * Prepends a value to a tuple
 */


function prepend_(self, k) {
  return new Tuple([k, ...self.tuple]);
}
/**
 * Concat tuples
 *
 * @ets_data_first concat_
 */


function concat(that) {
  return self => concat_(self, that);
}
/**
 * Concat tuples
 */


function concat_(self, that) {
  return new Tuple([...self.tuple, ...that.tuple]);
}
//# sourceMappingURL=index.js.map