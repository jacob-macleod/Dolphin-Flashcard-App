"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._ParSeqBrand = exports.Then = exports.Single = exports.Empty = exports.Both = void 0;
exports.combinePar = combinePar;
exports.combinePar_ = combinePar_;
exports.combineSeq = combineSeq;
exports.combineSeq_ = combineSeq_;
exports.empty = void 0;
exports.isEmpty = isEmpty;
exports.isParSeq = isParSeq;
exports.single = single;

var _commons = /*#__PURE__*/require("../../../Effect/commons.js");

var _index = /*#__PURE__*/require("../../../Function/index.js");

var IO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../IO/index.js"));

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../../Structural/index.js"));

var HS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../HashSet/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../List/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Tuple/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a, _b, _c, _d; // ets_tracing: off


const _ParSeqBrand = /*#__PURE__*/Symbol();

exports._ParSeqBrand = _ParSeqBrand;

function isParSeq(u) {
  return typeof u === "object" && u != null && _ParSeqBrand in u;
}

const _emptyHash = /*#__PURE__*/St.opt( /*#__PURE__*/St.randomInt());

class Empty {
  constructor() {
    this._tag = "Empty";
    this[_a] = _ParSeqBrand;
  }

  [(_a = _ParSeqBrand, St.equalsSym)](that) {
    return isParSeq(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return _emptyHash;
  }

  equalsSafe(that) {
    return IO.succeed(that._tag === "Empty");
  }

}

exports.Empty = Empty;

class Then {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._tag = "Then";
    this[_b] = _ParSeqBrand;
  }

  [(_b = _ParSeqBrand, St.equalsSym)](that) {
    return isParSeq(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return hashCode(this);
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      return (yield* _(self.eq(that))) || (yield* _(symmetric(associateThen)(self, that))) || (yield* _(symmetric(distributiveThen)(self, that))) || (yield* _(symmetric(zero)(self, that)));
    });
  }

  eq(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    if (that._tag === "Then") {
      return IO.gen(function* (_) {
        return (yield* _(self.left.equalsSafe(that.left))) && (yield* _(self.right.equalsSafe(that.right)));
      });
    }

    return IO.succeed(false);
  }

}

exports.Then = Then;

function associateThen(self, that) {
  return IO.gen(function* (_) {
    if (self._tag === "Then" && self.left._tag === "Then" && that._tag === "Then" && that.right._tag === "Then") {
      const al = self.left.left;
      const bl = self.left.right;
      const cl = self.right;
      const ar = that.left;
      const br = that.right.left;
      const cr = that.right.right;
      return (yield* _(al.equalsSafe(ar))) && (yield* _(bl.equalsSafe(br))) && (yield* _(cl.equalsSafe(cr)));
    }

    return false;
  });
}

function distributiveThen(self, that) {
  return IO.gen(function* (_) {
    if (self._tag === "Then" && self.right._tag === "Both" && that._tag === "Both" && that.left._tag === "Then" && that.right._tag === "Then") {
      const al = self.left;
      const bl = self.right.left;
      const cl = self.right.right;
      const ar1 = that.left.left;
      const br = that.left.right;
      const ar2 = that.right.left;
      const cr = that.right.right;

      if ((yield* _(ar1.equalsSafe(ar2))) && (yield* _(al.equalsSafe(ar1))) && (yield* _(bl.equalsSafe(br))) && (yield* _(cl.equalsSafe(cr)))) {
        return true;
      }
    }

    if (self._tag === "Then" && self.left._tag === "Both" && that._tag === "Both" && that.left._tag === "Then" && that.right._tag === "Then") {
      const al = self.left.left;
      const bl = self.left.right;
      const cl = self.right;
      const ar = that.left.left;
      const cr1 = that.left.right;
      const br = that.right.left;
      const cr2 = that.right.right;

      if ((yield* _(cr1.equalsSafe(cr2))) && (yield* _(al.equalsSafe(ar))) && (yield* _(bl.equalsSafe(br))) && (yield* _(cl.equalsSafe(cr1)))) {
        return true;
      }
    }

    return false;
  });
}

class Both {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._tag = "Both";
    this[_c] = _ParSeqBrand;
  }

  [(_c = _ParSeqBrand, St.equalsSym)](that) {
    return isParSeq(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return hashCode(this);
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      return (yield* _(self.eq(that))) || (yield* _(symmetric(associativeBoth)(self, that))) || (yield* _(symmetric(distributiveBoth)(self, that))) || (yield* _(commutativeBoth(self, that))) || (yield* _(symmetric(zero)(self, that)));
    });
  }

  eq(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;

    if (that._tag === "Both") {
      return IO.gen(function* (_) {
        return (yield* _(self.left.equalsSafe(that.left))) && (yield* _(self.right.equalsSafe(that.right)));
      });
    }

    return IO.succeed(false);
  }

}

exports.Both = Both;

function associativeBoth(self, that) {
  return IO.gen(function* (_) {
    if (self._tag === "Both" && self.left._tag === "Both" && that._tag === "Both" && that.right._tag === "Both") {
      const al = self.left.left;
      const bl = self.left.right;
      const cl = self.right;
      const ar = that.left;
      const br = that.right.left;
      const cr = that.right.right;
      return (yield* _(al.equalsSafe(ar))) && (yield* _(bl.equalsSafe(br))) && (yield* _(cl.equalsSafe(cr)));
    }

    return false;
  });
}

function distributiveBoth(self, that) {
  return IO.gen(function* (_) {
    if (self._tag === "Both" && self.left._tag === "Then" && self.right._tag === "Then" && that._tag === "Then" && that.right._tag === "Both") {
      const al1 = self.left.left;
      const bl = self.left.right;
      const al2 = self.right.left;
      const cl = self.right.right;
      const ar = that.left;
      const br = that.right.left;
      const cr = that.right.right;

      if ((yield* _(al1.equalsSafe(al2))) && (yield* _(al1.equalsSafe(ar))) && (yield* _(bl.equalsSafe(br))) && (yield* _(cl.equalsSafe(cr)))) {
        return true;
      }
    }

    if (self._tag === "Both" && self.left._tag === "Then" && self.right._tag === "Then" && that._tag === "Then" && that.left._tag === "Both") {
      const al = self.left.left;
      const cl1 = self.left.right;
      const bl = self.right.left;
      const cl2 = self.right.right;
      const ar = that.left.left;
      const br = that.left.right;
      const cr = that.right;

      if ((yield* _(cl1.equalsSafe(cl2))) && (yield* _(al.equalsSafe(ar))) && (yield* _(bl.equalsSafe(br))) && (yield* _(cl1.equalsSafe(cr)))) {
        return true;
      }
    }

    return false;
  });
}

function commutativeBoth(self, that) {
  return IO.gen(function* (_) {
    if (that._tag === "Both") {
      return (yield* _(self.left.equalsSafe(that.right))) && (yield* _(self.right.equalsSafe(that.left)));
    }

    return false;
  });
}

class Single {
  constructor(a) {
    this.a = a;
    this._tag = "Single";
    this[_d] = _ParSeqBrand;
  }

  [(_d = _ParSeqBrand, St.equalsSym)](that) {
    return isParSeq(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return St.combineHash(St.hashString(this._tag), St.hash(this.a));
  }

  equalsSafe(that) {
    return IO.succeed(that._tag === "Single" && St.equals(this.a, that.a));
  }

}

exports.Single = Single;

function zero(self, that) {
  if (self._tag === "Then" && self.right._tag === "Empty") {
    return self.left.equalsSafe(that);
  }

  if (self._tag === "Then" && self.left._tag === "Empty") {
    return self.right.equalsSafe(that);
  }

  if (self._tag === "Both" && self.right._tag === "Empty") {
    return self.left.equalsSafe(that);
  }

  if (self._tag === "Both" && self.left._tag === "Empty") {
    return self.right.equalsSafe(that);
  }

  return IO.succeed(false);
}

function symmetric(f) {
  return (a, b) => IO.gen(function* (_) {
    return (yield* _(f(a, b))) || (yield* _(f(b, a)));
  });
}
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events in parallel with that collection of events.
 */


function combinePar_(left, right) {
  return isEmpty(left) ? right : isEmpty(right) ? left : new Both(left, right);
}
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events in parallel with that collection of events.
 *
 * @ets_data_first combinePar_
 */


function combinePar(right) {
  return left => combinePar_(left, right);
}
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events followed by that collection of events.
 */


function combineSeq_(left, right) {
  return isEmpty(left) ? right : isEmpty(right) ? left : new Then(left, right);
}
/**
 * Combines this collection of events with that collection of events to
 * return a new collection of events that represents this collection of
 * events followed by that collection of events.
 *
 * @ets_data_first combineSeq_
 */


function combineSeq(right) {
  return left => combineSeq_(left, right);
}
/**
 * Constructs a new collection of events that contains the specified event.
 */


function single(a) {
  return new Single(a);
}
/**
 * Empty collection of events
 */


const empty = /*#__PURE__*/new Empty();
exports.empty = empty;

function isEmptyLoop(self) {
  while (!L.isEmpty(self)) {
    const head = L.unsafeFirst(self);
    const tail = L.tail(self);

    switch (head._tag) {
      case "Empty":
        {
          self = tail;
          break;
        }

      case "Single":
        {
          return false;
        }

      case "Both":
        {
          self = L.prepend_(L.prepend_(tail, head.right), head.left);
          break;
        }

      case "Then":
        {
          self = L.prepend_(L.prepend_(tail, head.right), head.left);
          break;
        }
    }
  }

  return true;
}
/**
 * Checks if the ParSeq is empty
 */


function isEmpty(self) {
  return isEmptyLoop(L.of(self));
}

function stepLoop(cause, stack, parallel, sequential) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    switch (cause._tag) {
      case "Empty":
        {
          if (L.isEmpty(stack)) {
            return Tp.tuple(parallel, sequential);
          } else {
            cause = L.unsafeFirst(stack);
            stack = L.tail(stack);
          }

          break;
        }

      case "Both":
        {
          stack = L.prepend_(stack, cause.right);
          cause = cause.left;
          break;
        }

      case "Then":
        {
          const left = cause.left;
          const right = cause.right;

          switch (left._tag) {
            case "Empty":
              {
                cause = cause.right;
                break;
              }

            case "Then":
              {
                cause = combineSeq_(left.left, combineSeq_(left.right, right));
                break;
              }

            case "Both":
              {
                cause = combinePar_(combineSeq_(left.left, right), combineSeq_(left.right, right));
                break;
              }

            default:
              {
                cause = left;
                sequential = L.prepend_(sequential, right);
              }
          }

          break;
        }

      default:
        {
          if (L.isEmpty(stack)) {
            return Tp.tuple(HS.add_(parallel, cause), sequential);
          } else {
            parallel = HS.add_(parallel, cause);
            cause = L.unsafeFirst(stack);
            stack = L.tail(stack);
            break;
          }
        }
    }
  }

  throw new Error("Bug");
}

function step(self) {
  return stepLoop(self, L.empty(), HS.make(), L.empty());
}

function flattenLoop(causes, flattened) {
  // eslint-disable-next-line no-constant-condition
  while (1) {
    const [parallel, sequential] = L.reduce_(causes, (0, _index.tuple)(HS.make(), L.empty()), ([parallel, sequential], cause) => {
      const [set, seq] = step(cause).tuple;
      return (0, _index.tuple)(HS.union_(parallel, set), L.concat_(sequential, seq));
    });
    const updated = HS.size(parallel) > 0 ? L.prepend_(flattened, parallel) : flattened;

    if (L.isEmpty(sequential)) {
      return L.reverse(updated);
    } else {
      causes = sequential;
      flattened = updated;
    }
  }

  throw new Error("Bug");
}

function flatten(self) {
  return flattenLoop(L.of(self), L.empty());
}

function hashCode(self) {
  const flat = flatten(self);
  const size = L.size(flat);
  let head;

  if (size === 0) {
    return _emptyHash;
  } else if (size === 1 && (head = L.unsafeFirst(flat)) && HS.size(head) === 1) {
    return L.unsafeFirst(L.from(head))[St.hashSym];
  } else {
    return St.hashIterator(flat[Symbol.iterator]());
  }
}
//# sourceMappingURL=primitives.js.map