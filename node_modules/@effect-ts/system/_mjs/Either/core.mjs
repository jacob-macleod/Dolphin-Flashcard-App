// ets_tracing: off

/**
 * adapted from https://github.com/gcanti/fp-ts
 */
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { isNone } from "../Option/core.mjs";
import * as St from "../Structural/index.mjs";

const _leftHash = /*#__PURE__*/St.hashString("@effect-ts/system/Either/Left");

const _rightHash = /*#__PURE__*/St.hashString("@effect-ts/system/Either/Right");
/**
 * Definitions
 */


export class Left {
  constructor(left) {
    this.left = left;
    this._tag = "Left";
  }

  [St.equalsSym](that) {
    return that instanceof Left && St.equals(this.left, that.left);
  }

  get [St.hashSym]() {
    return St.combineHash(_leftHash, St.hash(this.left));
  }

}
export class Right {
  constructor(right) {
    this.right = right;
    this._tag = "Right";
  }

  [St.equalsSym](that) {
    return that instanceof Right && St.equals(this.right, that.right);
  }

  get [St.hashSym]() {
    return St.combineHash(_rightHash, St.hash(this.right));
  }

}
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 */

export function right(a) {
  return new Right(a);
}
/**
 * Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
 * of this structure
 */

export function rightW(a) {
  return new Right(a);
}
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 */

export function left(e) {
  return new Left(e);
}
/**
 * Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
 * structure
 */

export function leftW(e) {
  return new Left(e);
}
/**
 * Widen left side `Either[E, A] => Either[E | E1, A]`
 */

export function widenE() {
  return (
    /**
     * @ets_optimize identity
     */
    self => self
  );
}
/**
 * Widen right side `Either[E, A] => Either[E, A | A1]`
 */

export function widenA() {
  return (
    /**
     * @ets_optimize identity
     */
    self => self
  );
}
/**
 * Alternatively construct `that` if `self` is left
 */

export function alt_(self, that) {
  return isLeft(self) ? that() : self;
}
/**
 * Alternatively construct `that` if `self` is left
 *
 * @ets_data_first alt_
 */

export function alt(that) {
  return self => alt_(self, that);
}
/**
 * Classic Applicative
 */

export function ap_(fab, fa) {
  return isLeft(fab) ? fab : isLeft(fa) ? fa : right(fab.right(fa.right));
}
/**
 * Classic Applicative
 *
 * @ets_data_first ap_
 */

export function ap(fa) {
  return fab => ap_(fab, fa);
}
/**
 * Apply both and return both
 */

export function zip_(fa, fb) {
  return chain_(fa, a => map_(fb, b => Tp.tuple(a, b)));
}
/**
 * Apply both and return both
 *
 * @ets_data_first zip_
 */

export function zip(fb) {
  return fa => zip_(fa, fb);
}
/**
 * Apply both and return first
 *
 * @ets_data_first zipFirst_
 */

export function zipFirst(fb) {
  return fa => zipFirst_(fa, fb);
}
/**
 * Apply both and return first
 */

export function zipFirst_(fa, fb) {
  return ap_(map_(fa, a => () => a), fb);
}
/**
 * Apply both and return second
 *
 * @ets_data_first zipSecond_
 */

export function zipSecond(fb) {
  return fa => zipSecond_(fa, fb);
}
/**
 * Apply both and return second
 */

export function zipSecond_(fa, fb) {
  return ap_(map_(fa, () => b => b), fb);
}
/**
 * Maps both left and right
 */

export function bimap_(fea, f, g) {
  return isLeft(fea) ? left(f(fea.left)) : right(g(fea.right));
}
/**
 * Maps both left and right
 *
 * @ets_data_first bimap_
 */

export function bimap(f, g) {
  return fa => bimap_(fa, f, g);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 */

export function chain_(fa, f) {
  return isLeft(fa) ? fa : f(fa.right);
}
/**
 * Extends this computation with another computation that depends on the
 * result of this computation by running the first computation, using its
 * result to generate a second computation, and running that computation.
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return ma => chain_(ma, f);
}
/**
 * Like chain but ignores the constructed outout
 *
 * @ets_data_first tap_
 */

export function tap(f) {
  return ma => chain_(ma, a => map_(f(a), () => a));
}
/**
 * Like chain but ignores the constructed outout
 */

export function tap_(ma, f) {
  return chain_(ma, a => map_(f(a), () => a));
}
/**
 * Self embed `Either[E, A]` into `Either[E, Either[E, A]]`
 */

export function duplicate(ma) {
  return extend_(ma, x => x);
}
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 *
 * @ets_data_first exists_
 */

export function exists(predicate) {
  return ma => isLeft(ma) ? false : predicate(ma.right);
}
/**
 * Returns `false` if `Left` or returns the result of the application of the given predicate to the `Right` value.
 */

export function exists_(ma, predicate) {
  return isLeft(ma) ? false : predicate(ma.right);
}
/**
 * Apply `Either[E, A] => B` in case `self` is `Right` returning `Either[E, B]`
 */

export function extend_(self, f) {
  return isLeft(self) ? self : right(f(self));
}
/**
 * Apply `Either[E, A] => B` in case `self` is `Right` returning `Either[E, B]`
 *
 * @ets_data_first extend_
 */

export function extend(f) {
  return self => extend_(self, f);
}
export function filterOrElse(predicate, onFalse) {
  return ma => chain_(ma, a => predicate(a) ? right(a) : left(onFalse(a)));
}
export function filterOrElse_(ma, predicate, onFalse) {
  return chain_(ma, a => predicate(a) ? right(a) : left(onFalse(a)));
}
/**
 * Flatten nested `Either[E, Either[E1, A]]` into `Either[E | E1, A]`
 */

export function flatten(mma) {
  return chain_(mma, x => x);
}
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 *
 * @ets_data_first fold_
 */

export function fold(onLeft, onRight) {
  return ma => isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
}
/**
 * Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the first function,
 * if the value is a `Right` the inner value is applied to the second function.
 */

export function fold_(ma, onLeft, onRight) {
  return isLeft(ma) ? onLeft(ma.left) : onRight(ma.right);
}
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 *
 * @ets_data_first fromNullable_
 */

export function fromNullable(e) {
  return a => a == null ? left(e()) : right(a);
}
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into a `Right`, if the value is nully use
 * the provided default as a `Left`
 */

export function fromNullable_(a, e) {
  return a == null ? left(e()) : right(a);
}
/**
 * Construct `Either[E, A]` from `Option[A]` constructing `E` with `onNone`
 *
 * @ets_data_first fromOption_
 */

export function fromOption(onNone) {
  return ma => isNone(ma) ? left(onNone()) : right(ma.value);
}
/**
 * Construct `Either[E, A]` from `Option[A]` constructing `E` with `onNone`
 */

export function fromOption_(ma, onNone) {
  return isNone(ma) ? left(onNone()) : right(ma.value);
}
export function fromPredicate(predicate, onFalse) {
  return a => predicate(a) ? right(a) : left(onFalse(a));
}
export function fromPredicate_(a, predicate, onFalse) {
  return predicate(a) ? right(a) : left(onFalse(a));
}
/**
 * Get `A` or in case self is left return `onLeft` result
 *
 * @ets_data_first getOrElse_
 */

export function getOrElse(onLeft) {
  return ma => getOrElse_(ma, onLeft);
}
/**
 * Get `A` or in case self is left return `onLeft` result
 */

export function getOrElse_(self, onLeft) {
  return isLeft(self) ? onLeft(self.left) : self.right;
}
/**
 * Returns `true` if the either is an instance of `Left`, `false` otherwise
 */

export function isLeft(ma) {
  switch (ma._tag) {
    case "Left":
      return true;

    case "Right":
      return false;
  }
}
/**
 * Returns `true` if the either is an instance of `Right`, `false` otherwise
 */

export function isRight(ma) {
  return ma._tag === "Right" ? true : false;
}
/**
 * Use `A => B` to transform `Either[E, A]` to `Either[E, B]`
 */

export function map_(fa, f) {
  return isLeft(fa) ? fa : right(f(fa.right));
}
/**
 * Use `A => B` to transform `Either[E, A]` to `Either[E, B]`
 *
 * @ets_data_first map_
 */

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * Use `E => E1` to transform `Either[E, A]` to `Either[E1, A]`
 */

export function mapLeft_(fea, f) {
  return isLeft(fea) ? left(f(fea.left)) : fea;
}
/**
 * Use `E => E1` to transform `Either[E, A]` to `Either[E1, A]`
 *
 * @ets_data_first mapLeft_
 */

export function mapLeft(f) {
  return fa => mapLeft_(fa, f);
}
/**
 * Merges `Left<E> | Right<B>` into `A | B`
 */

export function merge(self) {
  return fold_(self, x => x, x => x);
}
/**
 * Alternatively run onLeft
 *
 * @ets_data_first orElse_
 */

export function orElse(onLeft) {
  return ma => orElse_(ma, onLeft);
}
/**
 * Alternatively run onLeft
 */

export function orElse_(ma, onLeft) {
  return isLeft(ma) ? onLeft(ma.left) : ma;
}
/**
 * Alternatively run onLeft returning
 *
 * @ets_data_first orElseEither_
 */

export function orElseEither(onLeft) {
  return ma => orElseEither_(ma, onLeft);
}
/**
 * Alternatively run onLeft returning
 */

export function orElseEither_(ma, onLeft) {
  return orElse_(map_(ma, left), e => map_(onLeft(e), right));
}
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 */

export function parseJSON_(s, onError) {
  return tryCatch(() => JSON.parse(s), onError);
}
/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @ets_data_first parseJSON_
 */

export function parseJSON(onError) {
  return s => tryCatch(() => JSON.parse(s), onError);
}
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 */

export function stringifyJSON_(u, onError) {
  return tryCatch(() => JSON.stringify(u), onError);
}
/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @ets_data_first stringifyJSON_
 */

export function stringifyJSON(onError) {
  return u => tryCatch(() => JSON.stringify(u), onError);
}
/**
 * Inverts `Either[E, A]` into `Either[A, E]`
 */

export function swap(ma) {
  return isLeft(ma) ? right(ma.left) : left(ma.right);
}
/**
 * Default value for the `onError` argument of `tryCatch`
 */

export function toError(e) {
  return e instanceof Error ? e : new Error(String(e));
}
/**
 * Constructs a new `Either` from a function that might throw
 */

export function tryCatch(f, onError) {
  try {
    return right(f());
  } catch (e) {
    return left(onError(e));
  }
}
/**
 * Compact types `Either<E, A> | Either<E2, B> = Either<E | E2, A | B>`
 *
 * @ets_optimize identity
 */

export function compact(_) {
  return _;
}
/**
 * Reduce a value `b` through an `Either`
 */

export function reduce_(fa, b, f) {
  return isLeft(fa) ? b : f(b, fa.right);
}
/**
 * Reduce a value `b` through an `Either`
 *
 * @ets_data_first reduce_
 */

export function reduce(b, f) {
  return fa => reduce_(fa, b, f);
}
/**
 * Reduce a value `b` through an `Either` in inverted order
 *
 * @ets_data_first reduceRight_
 */

export function reduceRight(b, f) {
  return fa => reduceRight_(fa, b, f);
}
/**
 * Reduce a value `b` through an `Either` in inverted order
 */

export function reduceRight_(fa, b, f) {
  return isLeft(fa) ? b : f(fa.right, b);
}
//# sourceMappingURL=core.mjs.map