var _a; // ets_tracing: off


import * as A from "../../Collections/Immutable/Array/index.mjs";
import * as NEA from "../../Collections/Immutable/NonEmptyArray/index.mjs";
import * as T from "../../Effect/index.mjs";
import * as E from "../../Either/index.mjs";
import { flow, identity, pipe } from "../../Function/index.mjs";
import * as O from "../../Option/index.mjs";
import * as ST from "../../Structural/index.mjs";
import * as PR from "../Primitives/index.mjs";
export const BoolAlgebraTypeId = /*#__PURE__*/Symbol();
export const ValueTypeId = /*#__PURE__*/Symbol();
export const AndTypeId = /*#__PURE__*/Symbol();
export const OrTypeId = /*#__PURE__*/Symbol();
export const NotTypeId = /*#__PURE__*/Symbol();
export function concrete(_) {//
}
/**
 * A `BoolAlgebra<A>` is a description of logical operations on values of type
 * `A`.
 */

export class BoolAlgebra {
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
export class Value extends BoolAlgebra {
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
export function isValue(a) {
  concrete(a);
  return a.typeId === ValueTypeId;
}
export class And extends BoolAlgebra {
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
export function isAnd(a) {
  concrete(a);
  return a.typeId === AndTypeId;
}
export class Or extends BoolAlgebra {
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
export function isOr(a) {
  concrete(a);
  return a.typeId === OrTypeId;
}
export class Not extends BoolAlgebra {
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
export function isNot(a) {
  concrete(a);
  return a.typeId === NotTypeId;
}
export function isBoolAlgebra(a) {
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


export function as_(self, b) {
  return map_(self, _ => b);
}
/**
 * Returns a new result, with all values mapped to the specified constant.
 */

export function as(b) {
  return self => as_(self, b);
}
/**
 * If this result is a success returns `None`. If it is a failure returns a
 * new result containing all failures that are relevant to this result being
 * a failure.
 */

export function failures(self) {
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

export function chain_(self, f) {
  return fold_(self, f, and_, or_, not);
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified function.
 */

export function chain(f) {
  return self => chain_(self, f);
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified effectual function.
 */

export function chainM_(self, f) {
  return fold_(self, f, _ => T.zipWith_(_, _, and_), _ => T.zipWith_(_, _, or_), _ => T.map_(_, not));
}
/**
 * Returns a new result, with all values mapped to new results using the
 * specified effectual function.
 */

export function chainM(f) {
  return self => chainM_(self, f);
}
/**
 * Folds over the result bottom up, first converting values to `B`
 * values, and then combining the `B` values, using the specified functions.
 */

export function fold_(self, caseValue, caseAnd, caseOr, caseNot) {
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

export function fold(caseValue, caseAnd, caseOr, caseNot) {
  return self => fold_(self, caseValue, caseAnd, caseOr, caseNot);
}
export function implies_(self, that) {
  return or_(not(self), that);
}
export function implies(that) {
  return self => implies_(self, that);
}
export function iff_(self, that) {
  return and_(implies_(self, that), implies_(that, self));
}
export function iff(that) {
  return self => iff_(self, that);
}
/**
 * Determines whether the result is a failure, where values represent success
 * and are combined using logical conjunction, disjunction, and negation.
 */

export function isFailure(self) {
  return !isSuccess(self);
}
/**
 * Determines whether the result is a success, where values represent success
 * and are combined using logical conjunction, disjunction, and negation.
 */

export function isSuccess(self) {
  return fold_(self, _ => true, (a, b) => a && b, (a, b) => a || b, a => !a);
}
/**
 * Returns a new result, with all values mapped by the specified function.
 */

export function map_(self, f) {
  return chain_(self, flow(f, success));
}
/**
 * Returns a new result, with all values mapped by the specified function.
 */

export function map(f) {
  return self => map_(self, f);
}
/**
 * Returns a new result, with all values mapped by the specified effectual
 * function.
 */

export function mapM_(self, f) {
  return chainM_(self, a => T.map_(f(a), success));
}
/**
 * Returns a new result, with all values mapped by the specified effectual
 * function.
 */

export function mapM(f) {
  return self => mapM_(self, f);
}
/**
 * Returns a result that is the logical conjunction of all of the results in
 * the specified collection.
 */

export function all(as) {
  const arr = A.from(as);

  if (A.isNonEmpty(arr)) {
    return O.some(A.reduce_(A.drop_(arr, 1), arr[0], and_));
  }

  return O.none;
}
/**
 * Constructs a result that is the logical conjunction of two results.
 */

export function and_(left, right) {
  return new And(left, right);
}
/**
 * Constructs a result that is the logical conjunction of two results.
 */

export function and(right) {
  return left => and_(left, right);
}
/**
 * Returns a result that is the logical disjunction of all of the results in
 * the specified collection.
 */

export function any(as) {
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

export function collectAll(as) {
  return forEach(as, identity);
}
/**
 * Constructs a failed result with the specified value.
 */

export function failure(a) {
  return not(success(a));
}
/**
 * Applies the function `f` to each element of the `Iterable[A]` to produce
 * a collection of results, then combines all of those results to create a
 * single result that is the logical conjunction of all of the results.
 */

export function forEach(as, f) {
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

export function not(result) {
  return new Not(result);
}
/**
 * Constructs a result a that is the logical disjunction of two results.
 */

export function or_(left, right) {
  return new Or(left, right);
}
/**
 * Constructs a result a that is the logical disjunction of two results.
 */

export function or(right) {
  return left => or_(left, right);
}
/**
 * Constructs a successful result with the specified value.
 */

export function success(a) {
  return new Value(a);
}
/**
 * A successful result with the unit value.
 */

export const unit = /*#__PURE__*/success(undefined);
//# sourceMappingURL=index.mjs.map