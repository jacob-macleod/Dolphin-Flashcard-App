// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */
import * as Tp from "../Collections/Immutable/Tuple/index.mjs";
import { identity } from "../Function/core.mjs";
import * as St from "../Structural/index.mjs";

const _noneHash = /*#__PURE__*/St.hashString("@effect-ts/system/Option/None");

const _someHash = /*#__PURE__*/St.hashString("@effect-ts/system/Option/Some");
/**
 * Definitions
 */


export class None {
  constructor() {
    this._tag = "None";
  }

  [St.equalsSym](that) {
    return that instanceof None;
  }

  get [St.hashSym]() {
    return _noneHash;
  }

}
export class Some {
  constructor(value) {
    this.value = value;
    this._tag = "Some";
  }

  [St.equalsSym](that) {
    return that instanceof Some && St.equals(this.value, that.value);
  }

  get [St.hashSym]() {
    return St.combineHash(_someHash, St.hash(this.value));
  }

}
/**
 * Constructs none
 */

export const none = /*#__PURE__*/new None();
/**
 * Constructs none
 */

export function emptyOf() {
  return none;
}
/**
 * Constructs Some(A)
 */

export function some(a) {
  return new Some(a);
}
/**
 * Classic applicative
 */

export function ap_(fab, fa) {
  return isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value));
}
/**
 * Classic applicative
 *
 * @ets_data_first ap_
 */

export function ap(fa) {
  return fab => ap_(fab, fa);
}
/**
 * Zips `Option[A]` and `Option[B]` into `Option[(A, B)]`
 */

export function zip_(fa, fb) {
  return chain_(fa, a => map_(fb, b => Tp.tuple(a, b)));
}
/**
 * Zips `Option[A]` and `Option[B]` into `Option[(A, B)]`
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
 * Builds a new option constructed using the value of self
 */

export function chain_(self, f) {
  return isNone(self) ? none : f(self.value);
}
/**
 * Builds a new option constructed using the value of self
 *
 * @ets_data_first chain_
 */

export function chain(f) {
  return self => chain_(self, f);
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
 * Flattens nested options
 */

export function flatten(fa) {
  return chain_(fa, identity);
}
/**
 * Wraps this option into a second one
 */

export function duplicate(ma) {
  return isNone(ma) ? none : some(ma);
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @ets_data_first exists_
 */

export function exists(predicate) {
  return ma => isNone(ma) ? false : predicate(ma.value);
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 */

export function exists_(ma, predicate) {
  return isNone(ma) ? false : predicate(ma.value);
}
/**
 * Apply `Option[A] => B` in case self is some returning `Option[B]`
 *
 * @ets_data_first extend_
 */

export function extend(f) {
  return self => extend_(self, f);
}
/**
 * Apply `Option[A] => B` in case self is some returning `Option[B]`
 */

export function extend_(self, f) {
  return isNone(self) ? none : some(f(self));
}
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @ets_data_first fold_
 */

export function fold(onNone, onSome) {
  return ma => fold_(ma, onNone, onSome);
}
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 */

export function fold_(ma, onNone, onSome) {
  return isNone(ma) ? onNone() : onSome(ma.value);
}
/**
 * Constructs `Option[A]` from `Either[E, A]` discarding `E`
 */

export function fromEither(ma) {
  return ma._tag === "Left" ? none : some(ma.right);
}
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 */

export function fromNullable(a) {
  return a == null ? none : some(a);
}
/**
 * Returns a smart constructor based on the given predicate
 *
 * @ets_data_first fromPredicate_
 */

export function fromPredicate(predicate) {
  return a => predicate(a) ? some(a) : none;
}
/**
 * Returns a smart constructor based on the given predicate
 */

export function fromPredicate_(a, predicate) {
  return predicate(a) ? some(a) : none;
}
/**
 * Returns an `E` value if possible
 */

export function getLeft(ma) {
  return ma._tag === "Right" ? none : some(ma.left);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @ets_data_first getOrElse_
 */

export function getOrElse(onNone) {
  return o => getOrElse_(o, onNone);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @ets_data_first getOrElseS_
 */

export function getOrElseS(onNone) {
  return getOrElse(onNone);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 */

export function getOrElse_(ma, onNone) {
  return ma._tag === "None" ? onNone() : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 */

export function getOrElseS_(ma, onNone) {
  return getOrElse_(ma, onNone);
}
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 */

export function getRefinement(getOption) {
  return a => isSome(getOption(a));
}
/**
 * Returns an `A` value if possible
 */

export function getRight(ma) {
  return ma._tag === "Left" ? none : some(ma.right);
}
/**
 * Returns `true` if the option is `None`, `false` otherwise
 */

export function isNone(fa) {
  return fa._tag === "None";
}
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 */

export function isSome(fa) {
  return fa._tag === "Some";
}
/**
 * Use `A => B` to transform `Option[A]` to `Option[B]`
 */

export function map_(ma, f) {
  return isNone(ma) ? none : some(f(ma.value));
}
/**
 * Use `A => B` to transform `Option[A]` to `Option[B]`
 *
 * @ets_data_first map_
 */

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 */

export function mapNullable(f) {
  return ma => isNone(ma) ? none : fromNullable(f(ma.value));
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 */

export function toNullable(ma) {
  return isNone(ma) ? null : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 */

export function toUndefined(ma) {
  return isNone(ma) ? undefined : ma.value;
}
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 */

export function tryCatch(f) {
  try {
    return some(f());
  } catch (e) {
    return none;
  }
}
export const PartialExceptionTypeId = /*#__PURE__*/Symbol();
export class PartialException {
  constructor() {
    this._typeId = PartialExceptionTypeId;
  }

}

function raisePartial() {
  throw new PartialException();
}
/**
 * Simulates a partial function
 */


export function partial(f) {
  return (...args) => {
    try {
      return some(f(raisePartial)(...args));
    } catch (e) {
      if (e instanceof PartialException) {
        return none;
      }

      throw e;
    }
  };
}
//# sourceMappingURL=core.mjs.map