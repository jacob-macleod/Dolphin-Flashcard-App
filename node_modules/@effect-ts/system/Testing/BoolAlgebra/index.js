"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ValueTypeId = exports.Value = exports.OrTypeId = exports.Or = exports.NotTypeId = exports.Not = exports.BoolAlgebraTypeId = exports.BoolAlgebra = exports.AndTypeId = exports.And = void 0;
exports.all = all;
exports.and = and;
exports.and_ = and_;
exports.any = any;
exports.as = as;
exports.as_ = as_;
exports.chain = chain;
exports.chainM = chainM;
exports.chainM_ = chainM_;
exports.chain_ = chain_;
exports.collectAll = collectAll;
exports.concrete = concrete;
exports.failure = failure;
exports.failures = failures;
exports.fold = fold;
exports.fold_ = fold_;
exports.forEach = forEach;
exports.iff = iff;
exports.iff_ = iff_;
exports.implies = implies;
exports.implies_ = implies_;
exports.isAnd = isAnd;
exports.isBoolAlgebra = isBoolAlgebra;
exports.isFailure = isFailure;
exports.isNot = isNot;
exports.isOr = isOr;
exports.isSuccess = isSuccess;
exports.isValue = isValue;
exports.map = map;
exports.mapM = mapM;
exports.mapM_ = mapM_;
exports.map_ = map_;
exports.not = not;
exports.or = or;
exports.or_ = or_;
exports.success = success;
exports.unit = void 0;

var A = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/Array/index.js"));

var NEA = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Collections/Immutable/NonEmptyArray/index.js"));

var T = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Effect/index.js"));

var E = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Either/index.js"));

var _index5 = /*#__PURE__*/require("../../Function/index.js");

var O = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Option/index.js"));

var ST = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../../Structural/index.js"));

var PR = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Primitives/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var _a; // ets_tracing: off


const BoolAlgebraTypeId = /*#__PURE__*/Symbol();
exports.BoolAlgebraTypeId = BoolAlgebraTypeId;
const ValueTypeId = /*#__PURE__*/Symbol();
exports.ValueTypeId = ValueTypeId;
const AndTypeId = /*#__PURE__*/Symbol();
exports.AndTypeId = AndTypeId;
const OrTypeId = /*#__PURE__*/Symbol();
exports.OrTypeId = OrTypeId;
const NotTypeId = /*#__PURE__*/Symbol();
exports.NotTypeId = NotTypeId;

function concrete(_) {//
}
/**
 * A `BoolAlgebra<A>` is a description of logical operations on values of type
 * `A`.
 */


class BoolAlgebra {
  constructor() {
    this[_a] = BoolAlgebraTypeId;
  }

  get [(_a = BoolAlgebraTypeId, PR._A, PR._C, ST.hashSym)]() {
    return fold_(this, a => ST.hash(a), (a, b) => a & b, (a, b) => a | b, a => ~a);
  }

  ["&&"](that) {
    return and_(this, that);
  }

  ["||"](that) {
    return or_(this, that);
  }

  get ["!"]() {
    return not(this);
  }

}

exports.BoolAlgebra = BoolAlgebra;

class Value extends BoolAlgebra {
  constructor(value) {
    super();
    this.value = value;
    this.typeId = ValueTypeId;
  }

  [ST.equalsSym](that) {
    if (isBoolAlgebra(that)) {
      return this.equal(that) || doubleNegative(this, that);
    }

    return false;
  }

  get [ST.hashSym]() {
    return fold_(this, a => ST.hash(a), (a, b) => a & b, (a, b) => a | b, a => ~a);
  }

  equal(that) {
    if (isValue(that)) {
      return ST.equals(this.value, that.value);
    }

    return false;
  }

}

exports.Value = Value;

function isValue(a) {
  concrete(a);
  return a.typeId === ValueTypeId;
}

class And extends BoolAlgebra {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this.typeId = AndTypeId;
  }

  [ST.equalsSym](that) {
    if (isBoolAlgebra(that)) {
      return this.equal(that) || this.commutative(that) || symmetric(And.associative)(this, that) || symmetric(And.distributive)(this, that) || doubleNegative(this, that) || this.deMorgansLaws(that);
    }

    return false;
  }

  equal(that) {
    if (isAnd(that)) {
      return ST.equals(this.left, that.left) && ST.equals(this.right, that.right);
    }

    return false;
  }

  static associative(left, right) {
    if (isAnd(left) && isAnd(right)) {
      if (isAnd(left.left) && isAnd(right.right)) {
        const {
          left: a1,
          right: b1
        } = left.left;
        const c1 = left.right;
        const {
          left: b2,
          right: c2
        } = right.right;
        const a2 = right.left;
        return ST.equals(a1, a2) && ST.equals(b1, b2) && ST.equals(c1, c2);
      }
    }

    return false;
  }

  commutative(that) {
    if (isAnd(that)) {
      const {
        left: al,
        right: bl
      } = this;
      const {
        left: ar,
        right: br
      } = that;
      return ST.equals(al, br) && ST.equals(bl, ar);
    }

    return false;
  }

  static distributive(left, right) {
    if (isAnd(left) && isOr(right)) {
      if (isOr(left.right) && isAnd(right.left) && isAnd(right.right)) {
        const a1 = left.left;
        const {
          left: b1,
          right: c1
        } = left.right;
        const {
          left: a2,
          right: b2
        } = right.left;
        const {
          left: a3,
          right: c2
        } = right.right;
        return ST.equals(a1, a2) && ST.equals(a1, a3) && ST.equals(b1, b2) && ST.equals(c1, c2);
      }
    }

    return false;
  }

  deMorgansLaws(that) {
    if (isNot(that)) {
      if (isNot(this.left) && isNot(this.right)) {
        if (isOr(that.result)) {
          const a = this.left.result;
          const b = this.right.result;
          const {
            left: c,
            right: d
          } = that.result;
          return ST.equals(a, c) && ST.equals(b, d);
        }
      }
    }

    return false;
  }

}

exports.And = And;

function isAnd(a) {
  concrete(a);
  return a.typeId === AndTypeId;
}

class Or extends BoolAlgebra {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
    this.typeId = OrTypeId;
  }

  [ST.equalsSym](that) {
    if (isBoolAlgebra(that)) {
      return this.equal(that) || this.commutative(that) || symmetric(Or.associative)(this, that) || symmetric(Or.distributive)(this, that) || doubleNegative(this, that) || this.deMorgansLaws(that);
    }

    return false;
  }

  equal(that) {
    if (isOr(that)) {
      return ST.equals(this.left, that.left) && ST.equals(this.right, that.right);
    }

    return false;
  }

  static associative(left, right) {
    if (isOr(left) && isOr(left.left)) {
      if (isOr(right) && isOr(right.right)) {
        const {
          left: a1,
          right: b1
        } = left.left;
        const c1 = left.right;
        const a2 = right.left;
        const {
          left: b2,
          right: c2
        } = right.right;
        return ST.equals(a1, a2) && ST.equals(b1, b2) && ST.equals(c1, c2);
      }
    }

    return false;
  }

  commutative(that) {
    if (isOr(that)) {
      const {
        left: al,
        right: bl
      } = this;
      const {
        left: ar,
        right: br
      } = that;
      return ST.equals(al, br) && ST.equals(bl, ar);
    }

    return false;
  }

  static distributive(left, right) {
    if (isOr(left) && isAnd(left.right)) {
      if (isAnd(right) && isOr(right.left) && isOr(right.right)) {
        const a1 = left.left;
        const {
          left: b1,
          right: c1
        } = left.right;
        const {
          left: a2,
          right: b2
        } = right.left;
        const {
          left: a3,
          right: c2
        } = right.right;
        return ST.equals(a1, a2) && ST.equals(a1, a3) && ST.equals(b1, b2) && ST.equals(c1, c2);
      }
    }

    return false;
  }

  deMorgansLaws(that) {
    if (isNot(this.left) && isNot(this.right)) {
      if (isNot(that) && isAnd(that.result)) {
        const a = this.left.result;
        const b = this.right.result;
        const {
          left: c,
          right: d
        } = that.result;
        return ST.equals(a, c) && ST.equals(b, d);
      }
    }

    return false;
  }

}

exports.Or = Or;

function isOr(a) {
  concrete(a);
  return a.typeId === OrTypeId;
}

class Not extends BoolAlgebra {
  constructor(result) {
    super();
    this.result = result;
    this.typeId = NotTypeId;
  }

  [ST.equalsSym](that) {
    if (isBoolAlgebra(that)) {
      return this.equal(that) || doubleNegative(that, this) || this.deMorgansLaws(that);
    }

    return false;
  }

  equal(that) {
    if (isNot(that)) {
      return ST.equals(this.result, that.result);
    }

    return false;
  }

  deMorgansLaws(that) {
    if (isAnd(that)) {
      if (isOr(this.result) && isNot(that.left) && isNot(that.right)) {
        const {
          left: a,
          right: b
        } = this.result;
        const c = that.left.result;
        const d = that.right.result;
        return ST.equals(a, c) && ST.equals(b, d);
      }
    }

    if (isOr(that)) {
      if (isAnd(this.result) && isNot(that.left) && isNot(that.right)) {
        const {
          left: a,
          right: b
        } = this.result;
        const c = that.left.result;
        const d = that.right.result;
        return ST.equals(a, c) && ST.equals(b, d);
      }
    }

    return false;
  }

}

exports.Not = Not;

function isNot(a) {
  concrete(a);
  return a.typeId === NotTypeId;
}

function isBoolAlgebra(a) {
  return typeof a === "object" && a !== null && BoolAlgebraTypeId in a;
}

function doubleNegative(left, right) {
  if (isNot(right) && isNot(right.result)) {
    return ST.equals(left, right.result.result);
  }

  return false;
}

function symmetric(f) {
  return (a1, a2) => f(a1, a2) || f(a2, a1);
}
/**
 * Returns a new result, with all values mapped to the specified constant.
 */


function as_(self, b) {
  return map_(self, _ => b);
}
/**
 * Returns a new result, with all values mapped to the specified constant.
 */


function as(b) {
  return self => as_(self, b);
}
/**
 * If this result is a success returns `None`. If it is a failure returns a
 * new result containing all failures that are relevant to this result being
 * a failure.
 */


function failures(self) {
  return E.fold_(fold_(self, a => E.right(success(a)), (l, r) => {
    if (E.isRight(l)) {
      if (E.isRight(r)) {
        return E.right(and_(l.right, r.right));
      } else {
        return E.left(r.left);
      }
    } else {
      if (E.isRight(r)) {
        return E.left(l.left);
      } else {
        return E.left(and_(l.left, r.left));
      }
    }
  }, (l, r) => {
    if (E.isRight(l)) {
      if (E.isRight(r)) {
        return E.right(or_(l.right, r.right));
      } else {
        return E.right(l.right);
      }
    } else {
      if (E.isRight(r)) {
        return E.right(r.right);
      } else {
        return E.left(or_(l.left, r.left));
      }
    }
  }, r => E.swap(r)), _ => O.some(_), _ => O.none);
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified function.
 */


function chain_(self, f) {
  return fold_(self, f, and_, or_, not);
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified function.
 */


function chain(f) {
  return self => chain_(self, f);
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified effectual function.
 */


function chainM_(self, f) {
  return fold_(self, f, _ => T.zipWith_(_, _, and_), _ => T.zipWith_(_, _, or_), _ => T.map_(_, not));
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified effectual function.
 */


function chainM(f) {
  return self => chainM_(self, f);
}
/**
 * Folds over the result bottom up, first converting values to `B`
 * values, and then combining the `B` values, using the specified functions.
 */


function fold_(self, caseValue, caseAnd, caseOr, caseNot) {
  concrete(self);

  switch (self.typeId) {
    case ValueTypeId:
      return caseValue(self.value);

    case AndTypeId:
      return caseAnd(fold_(self.left, caseValue, caseAnd, caseOr, caseNot), fold_(self.right, caseValue, caseAnd, caseOr, caseNot));

    case OrTypeId:
      return caseOr(fold_(self.left, caseValue, caseAnd, caseOr, caseNot), fold_(self.right, caseValue, caseAnd, caseOr, caseNot));

    case NotTypeId:
      return caseNot(fold_(self.result, caseValue, caseAnd, caseOr, caseNot));
  }
}
/**
 * Folds over the result bottom up, first converting values to `B`
 * values, and then combining the `B` values, using the specified functions.
 */


function fold(caseValue, caseAnd, caseOr, caseNot) {
  return self => fold_(self, caseValue, caseAnd, caseOr, caseNot);
}

function implies_(self, that) {
  return or_(not(self), that);
}

function implies(that) {
  return self => implies_(self, that);
}

function iff_(self, that) {
  return and_(implies_(self, that), implies_(that, self));
}

function iff(that) {
  return self => iff_(self, that);
}
/**
 * Determines whether the result is a failure, where values represent success
 * and are combined using logical conjunction, disjunction, and negation.
 */


function isFailure(self) {
  return !isSuccess(self);
}
/**
 * Determines whether the result is a success, where values represent success
 * and are combined using logical conjunction, disjunction, and negation.
 */


function isSuccess(self) {
  return fold_(self, _ => true, (a, b) => a && b, (a, b) => a || b, a => !a);
}
/**
 * Returns a new result, with all values mapped by the specified function.
 */


function map_(self, f) {
  return chain_(self, (0, _index5.flow)(f, success));
}
/**
 * Returns a new result, with all values mapped by the specified function.
 */


function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a new result, with all values mapped by the specified effectual
 * function.
 */


function mapM_(self, f) {
  return chainM_(self, a => T.map_(f(a), success));
}
/**
 * Returns a new result, with all values mapped by the specified effectual
 * function.
 */


function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Returns a result that is the logical conjunction of all of the results in
 * the specified collection.
 */


function all(as) {
  const arr = A.from(as);

  if (A.isNonEmpty(arr)) {
    return O.some(A.reduce_(A.drop_(arr, 1), arr[0], and_));
  }

  return O.none;
}
/**
 * Constructs a result that is the logical conjunction of two results.
 */


function and_(left, right) {
  return new And(left, right);
}
/**
 * Constructs a result that is the logical conjunction of two results.
 */


function and(right) {
  return left => and_(left, right);
}
/**
 * Returns a result that is the logical disjunction of all of the results in
 * the specified collection.
 */


function any(as) {
  const arr = A.from(as);

  if (A.isNonEmpty(arr)) {
    const [init, ...rest] = arr;
    return O.some(A.reduce_(rest, init, or_));
  }

  return O.none;
}
/**
 * Combines a collection of results to create a single result that succeeds
 * if all of the results succeed.
 */


function collectAll(as) {
  return forEach(as, _index5.identity);
}
/**
 * Constructs a failed result with the specified value.
 */


function failure(a) {
  return not(success(a));
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` to produce
 * a collection of results, then combines all of those results to create a
 * single result that is the logical conjunction of all of the results.
 */


function forEach(as, f) {
  const arr = A.from(as);

  if (A.isNonEmpty(arr)) {
    const result = NEA.map_(arr, f);
    return O.some(A.reduce_(NEA.tail(result), NEA.head(result), and_));
  }

  return O.none;
}
/**
 * Constructs a result that is the logical negation of the specified result.
 */


function not(result) {
  return new Not(result);
}
/**
 * Constructs a result a that is the logical disjunction of two results.
 */


function or_(left, right) {
  return new Or(left, right);
}
/**
 * Constructs a result a that is the logical disjunction of two results.
 */


function or(right) {
  return left => or_(left, right);
}
/**
 * Constructs a successful result with the specified value.
 */


function success(a) {
  return new Value(a);
}
/**
 * A successful result with the unit value.
 */


const unit = /*#__PURE__*/success(undefined);
exports.unit = unit;
//# sourceMappingURL=index.js.map