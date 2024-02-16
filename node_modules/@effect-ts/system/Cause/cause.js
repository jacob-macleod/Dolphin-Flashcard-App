"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Traced = exports.Then = exports.Interrupt = exports.Fail = exports.Empty = exports.Die = exports.CauseSym = exports.Both = void 0;
exports.combinePar = combinePar;
exports.combineSeq = combineSeq;
exports.die = die;
exports.empty = void 0;
exports.equals = equals;
exports.fail = fail;
exports.interrupt = interrupt;
exports.isCause = isCause;
exports.isEmpty = isEmpty;
exports.traced = traced;

var HS = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/HashSet/index.js"));

var L = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/List/core.js"));

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _id = /*#__PURE__*/require("../Fiber/id.js");

var _index3 = /*#__PURE__*/require("../Function/index.js");

var IO = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../IO/index.js"));

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Option/index.js"));

var _index6 = /*#__PURE__*/require("../Stack/index.js");

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a, _b, _c, _d, _e, _f, _g; // ets_tracing: off


const CauseSym = /*#__PURE__*/Symbol();
exports.CauseSym = CauseSym;

function isCause(self) {
  return typeof self === "object" && self != null && CauseSym in self;
}

const _emptyHash = /*#__PURE__*/St.opt( /*#__PURE__*/St.randomInt());

class Empty {
  constructor() {
    this._tag = "Empty";
    this[_a] = CauseSym;
  }

  [(_a = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return _emptyHash;
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      if (that._tag === "Empty") {
        return true;
      } else if (that._tag === "Then") {
        return (yield* _(self.equalsSafe(that.left))) && (yield* _(self.equalsSafe(that.right)));
      } else if (that._tag === "Both") {
        return (yield* _(self.equalsSafe(that.left))) && (yield* _(self.equalsSafe(that.right)));
      } else {
        return false;
      }
    });
  }

}

exports.Empty = Empty;
const empty = /*#__PURE__*/new Empty();
exports.empty = empty;

class Fail {
  constructor(value) {
    this.value = value;
    this._tag = "Fail";
    this[_b] = CauseSym;
  }

  [(_b = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return St.combineHash(St.hashString(this._tag), St.hash(this.value));
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      switch (that._tag) {
        case "Fail":
          {
            return St.equals(self.value, that.value);
          }

        case "Then":
          {
            return yield* _(sym(zero)(self, that));
          }

        case "Both":
          {
            return yield* _(sym(zero)(self, that));
          }

        case "Traced":
          {
            return yield* _(self.equalsSafe(that.cause));
          }
      }

      return false;
    });
  }

}

exports.Fail = Fail;

class Die {
  constructor(value) {
    this.value = value;
    this._tag = "Die";
    this[_c] = CauseSym;
  }

  [(_c = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return St.combineHash(St.hashString(this._tag), St.hash(this.value));
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      switch (that._tag) {
        case "Die":
          {
            return St.equals(self.value, that.value);
          }

        case "Then":
          {
            return yield* _(sym(zero)(self, that));
          }

        case "Both":
          {
            return yield* _(sym(zero)(self, that));
          }

        case "Traced":
          {
            return yield* _(self.equalsSafe(that.cause));
          }
      }

      return false;
    });
  }

}

exports.Die = Die;

class Interrupt {
  constructor(fiberId) {
    this.fiberId = fiberId;
    this._tag = "Interrupt";
    this[_d] = CauseSym;
  }

  [(_d = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return St.combineHash(St.hashString(this._tag), St.hash(this.fiberId));
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      switch (that._tag) {
        case "Interrupt":
          {
            return (0, _id.equalsFiberID)(self.fiberId, that.fiberId);
          }

        case "Then":
          {
            return yield* _(sym(zero)(self, that));
          }

        case "Both":
          {
            return yield* _(sym(zero)(self, that));
          }

        case "Traced":
          {
            return yield* _(self.equalsSafe(that.cause));
          }
      }

      return false;
    });
  }

}

exports.Interrupt = Interrupt;

class Traced {
  constructor(cause, trace) {
    this.cause = cause;
    this.trace = trace;
    this._tag = "Traced";
    this[_e] = CauseSym;
  }

  [(_e = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return this.cause[St.hashSym];
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      if (that._tag === "Traced") {
        return yield* _(self.cause.equalsSafe(that.cause));
      }

      return yield* _(self.cause.equalsSafe(that));
    });
  }

}

exports.Traced = Traced;

class Then {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._tag = "Then";
    this[_f] = CauseSym;
  }

  [(_f = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return hashCode(this);
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      switch (that._tag) {
        case "Traced":
          {
            return yield* _(self.equalsSafe(that.cause));
          }
      }

      return (yield* _(self.eq(that))) || (yield* _(sym(associativeThen)(self, that))) || (yield* _(sym(distributiveThen)(self, that))) || (yield* _(sym(zero)(self, that)));
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

class Both {
  constructor(left, right) {
    this.left = left;
    this.right = right;
    this._tag = "Both";
    this[_g] = CauseSym;
  }

  [(_g = CauseSym, St.equalsSym)](that) {
    return isCause(that) && IO.run(this.equalsSafe(that));
  }

  get [St.hashSym]() {
    return hashCode(this);
  }

  equalsSafe(that) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    return IO.gen(function* (_) {
      switch (that._tag) {
        case "Traced":
          {
            return yield* _(self.equalsSafe(that.cause));
          }
      }

      return (yield* _(self.eq(that))) || (yield* _(sym(associativeBoth)(self, that))) || (yield* _(sym(distributiveBoth)(self, that))) || (yield* _(commutativeBoth(self, that))) || (yield* _(sym(zero)(self, that)));
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

function fail(value) {
  return new Fail(value);
}

function traced(cause, trace) {
  if (L.isEmpty(trace.executionTrace) && L.isEmpty(trace.stackTrace) && O.isNone(trace.parentTrace)) {
    return cause;
  }

  return new Traced(cause, trace);
}

function die(value) {
  return new Die(value);
}

function interrupt(fiberId) {
  return new Interrupt(fiberId);
}

function combineSeq(left, right) {
  return isEmpty(left) ? right : isEmpty(right) ? left : new Then(left, right);
}

function combinePar(left, right) {
  return isEmpty(left) ? right : isEmpty(right) ? left : new Both(left, right);
}
/**
 * Determines if the `Cause` is empty.
 */


function isEmpty(cause) {
  if (cause._tag === "Empty" || cause._tag === "Traced" && cause.cause._tag === "Empty") {
    return true;
  }

  let causes = undefined;
  let current = cause;

  while (current) {
    switch (current._tag) {
      case "Die":
        {
          return false;
        }

      case "Fail":
        {
          return false;
        }

      case "Interrupt":
        {
          return false;
        }

      case "Then":
        {
          causes = new _index6.Stack(current.right, causes);
          current = current.left;
          break;
        }

      case "Both":
        {
          causes = new _index6.Stack(current.right, causes);
          current = current.left;
          break;
        }

      case "Traced":
        {
          current = current.cause;
          break;
        }

      default:
        {
          current = undefined;
        }
    }

    if (!current && causes) {
      current = causes.value;
      causes = causes.previous;
    }
  }

  return true;
}

function associativeThen(self, that) {
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

function sym(f) {
  return (l, r) => IO.gen(function* (_) {
    return (yield* _(f(l, r))) || (yield* _(f(r, l)));
  });
}

function equals(self, that) {
  return IO.run(self.equalsSafe(that));
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

      case "Traced":
        {
          cause = cause.cause;
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
            case "Traced":
              {
                cause = combineSeq(left.cause, right);
                break;
              }

            case "Empty":
              {
                cause = cause.right;
                break;
              }

            case "Then":
              {
                cause = combineSeq(left.left, combineSeq(left.right, right));
                break;
              }

            case "Both":
              {
                cause = combinePar(combineSeq(left.left, right), combineSeq(left.right, right));
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
    const [parallel, sequential] = L.reduce_(causes, (0, _index3.tuple)(HS.make(), L.empty()), ([parallel, sequential], cause) => {
      const {
        tuple: [set, seq]
      } = step(cause);
      return (0, _index3.tuple)(HS.union_(parallel, set), L.concat_(sequential, seq));
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
//# sourceMappingURL=cause.js.map