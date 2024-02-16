"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Some = exports.PartialExceptionTypeId = exports.PartialException = exports.None = void 0;
exports.ap = ap;
exports.ap_ = ap_;
exports.chain = chain;
exports.chain_ = chain_;
exports.duplicate = duplicate;
exports.emptyOf = emptyOf;
exports.exists = exists;
exports.exists_ = exists_;
exports.extend = extend;
exports.extend_ = extend_;
exports.flatten = flatten;
exports.fold = fold;
exports.fold_ = fold_;
exports.fromEither = fromEither;
exports.fromNullable = fromNullable;
exports.fromPredicate = fromPredicate;
exports.fromPredicate_ = fromPredicate_;
exports.getLeft = getLeft;
exports.getOrElse = getOrElse;
exports.getOrElseS = getOrElseS;
exports.getOrElseS_ = getOrElseS_;
exports.getOrElse_ = getOrElse_;
exports.getRefinement = getRefinement;
exports.getRight = getRight;
exports.isNone = isNone;
exports.isSome = isSome;
exports.map = map;
exports.mapNullable = mapNullable;
exports.map_ = map_;
exports.none = void 0;
exports.partial = partial;
exports.some = some;
exports.tap = tap;
exports.tap_ = tap_;
exports.toNullable = toNullable;
exports.toUndefined = toUndefined;
exports.tryCatch = tryCatch;
exports.zip = zip;
exports.zipFirst = zipFirst;
exports.zipFirst_ = zipFirst_;
exports.zipSecond = zipSecond;
exports.zipSecond_ = zipSecond_;
exports.zip_ = zip_;

var Tp = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Collections/Immutable/Tuple/index.js"));

var _core = /*#__PURE__*/require("../Function/core.js");

var St = /*#__PURE__*/_interopRequireWildcard( /*#__PURE__*/require("../Structural/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

// ets_tracing: off

/* adapted from https://github.com/gcanti/fp-ts */
const _noneHash = /*#__PURE__*/St.hashString("@effect-ts/system/Option/None");

const _someHash = /*#__PURE__*/St.hashString("@effect-ts/system/Option/Some");
/**
 * Definitions
 */


class None {
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

exports.None = None;

class Some {
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


exports.Some = Some;
const none = /*#__PURE__*/new None();
/**
 * Constructs none
 */

exports.none = none;

function emptyOf() {
  return none;
}
/**
 * Constructs Some(A)
 */


function some(a) {
  return new Some(a);
}
/**
 * Classic applicative
 */


function ap_(fab, fa) {
  return isNone(fab) ? none : isNone(fa) ? none : some(fab.value(fa.value));
}
/**
 * Classic applicative
 *
 * @ets_data_first ap_
 */


function ap(fa) {
  return fab => ap_(fab, fa);
}
/**
 * Zips `Option[A]` and `Option[B]` into `Option[(A, B)]`
 */


function zip_(fa, fb) {
  return chain_(fa, a => map_(fb, b => Tp.tuple(a, b)));
}
/**
 * Zips `Option[A]` and `Option[B]` into `Option[(A, B)]`
 *
 * @ets_data_first zip_
 */


function zip(fb) {
  return fa => zip_(fa, fb);
}
/**
 * Apply both and return first
 *
 * @ets_data_first zipFirst_
 */


function zipFirst(fb) {
  return fa => zipFirst_(fa, fb);
}
/**
 * Apply both and return first
 */


function zipFirst_(fa, fb) {
  return ap_(map_(fa, a => () => a), fb);
}
/**
 * Apply both and return second
 *
 * @ets_data_first zipSecond_
 */


function zipSecond(fb) {
  return fa => zipSecond_(fa, fb);
}
/**
 * Apply both and return second
 */


function zipSecond_(fa, fb) {
  return ap_(map_(fa, () => b => b), fb);
}
/**
 * Builds a new option constructed using the value of self
 */


function chain_(self, f) {
  return isNone(self) ? none : f(self.value);
}
/**
 * Builds a new option constructed using the value of self
 *
 * @ets_data_first chain_
 */


function chain(f) {
  return self => chain_(self, f);
}
/**
 * Like chain but ignores the constructed outout
 *
 * @ets_data_first tap_
 */


function tap(f) {
  return ma => chain_(ma, a => map_(f(a), () => a));
}
/**
 * Like chain but ignores the constructed outout
 */


function tap_(ma, f) {
  return chain_(ma, a => map_(f(a), () => a));
}
/**
 * Flattens nested options
 */


function flatten(fa) {
  return chain_(fa, _core.identity);
}
/**
 * Wraps this option into a second one
 */


function duplicate(ma) {
  return isNone(ma) ? none : some(ma);
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 *
 * @ets_data_first exists_
 */


function exists(predicate) {
  return ma => isNone(ma) ? false : predicate(ma.value);
}
/**
 * Returns `true` if the predicate is satisfied by the wrapped value
 */


function exists_(ma, predicate) {
  return isNone(ma) ? false : predicate(ma.value);
}
/**
 * Apply `Option[A] => B` in case self is some returning `Option[B]`
 *
 * @ets_data_first extend_
 */


function extend(f) {
  return self => extend_(self, f);
}
/**
 * Apply `Option[A] => B` in case self is some returning `Option[B]`
 */


function extend_(self, f) {
  return isNone(self) ? none : some(f(self));
}
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 *
 * @ets_data_first fold_
 */


function fold(onNone, onSome) {
  return ma => fold_(ma, onNone, onSome);
}
/**
 * Takes a default value, a function, and an `Option` value, if the `Option` value is `None` the default value is
 * returned, otherwise the function is applied to the value inside the `Some` and the result is returned.
 */


function fold_(ma, onNone, onSome) {
  return isNone(ma) ? onNone() : onSome(ma.value);
}
/**
 * Constructs `Option[A]` from `Either[E, A]` discarding `E`
 */


function fromEither(ma) {
  return ma._tag === "Left" ? none : some(ma.right);
}
/**
 * Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
 * returns the value wrapped in a `Some`
 */


function fromNullable(a) {
  return a == null ? none : some(a);
}
/**
 * Returns a smart constructor based on the given predicate
 *
 * @ets_data_first fromPredicate_
 */


function fromPredicate(predicate) {
  return a => predicate(a) ? some(a) : none;
}
/**
 * Returns a smart constructor based on the given predicate
 */


function fromPredicate_(a, predicate) {
  return predicate(a) ? some(a) : none;
}
/**
 * Returns an `E` value if possible
 */


function getLeft(ma) {
  return ma._tag === "Right" ? none : some(ma.left);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @ets_data_first getOrElse_
 */


function getOrElse(onNone) {
  return o => getOrElse_(o, onNone);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 *
 * @ets_data_first getOrElseS_
 */


function getOrElseS(onNone) {
  return getOrElse(onNone);
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 */


function getOrElse_(ma, onNone) {
  return ma._tag === "None" ? onNone() : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns the given default value
 */


function getOrElseS_(ma, onNone) {
  return getOrElse_(ma, onNone);
}
/**
 * Returns a `Refinement` (i.e. a custom type guard) from a `Option` returning function.
 * This function ensures that a custom type guard definition is type-safe.
 */


function getRefinement(getOption) {
  return a => isSome(getOption(a));
}
/**
 * Returns an `A` value if possible
 */


function getRight(ma) {
  return ma._tag === "Left" ? none : some(ma.right);
}
/**
 * Returns `true` if the option is `None`, `false` otherwise
 */


function isNone(fa) {
  return fa._tag === "None";
}
/**
 * Returns `true` if the option is an instance of `Some`, `false` otherwise
 */


function isSome(fa) {
  return fa._tag === "Some";
}
/**
 * Use `A => B` to transform `Option[A]` to `Option[B]`
 */


function map_(ma, f) {
  return isNone(ma) ? none : some(f(ma.value));
}
/**
 * Use `A => B` to transform `Option[A]` to `Option[B]`
 *
 * @ets_data_first map_
 */


function map(f) {
  return fa => map_(fa, f);
}
/**
 * This is `chain` + `fromNullable`, useful when working with optional values
 */


function mapNullable(f) {
  return ma => isNone(ma) ? none : fromNullable(f(ma.value));
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `null`.
 */


function toNullable(ma) {
  return isNone(ma) ? null : ma.value;
}
/**
 * Extracts the value out of the structure, if it exists. Otherwise returns `undefined`.
 */


function toUndefined(ma) {
  return isNone(ma) ? undefined : ma.value;
}
/**
 * Transforms an exception into an `Option`. If `f` throws, returns `None`, otherwise returns the output wrapped in
 * `Some`
 */


function tryCatch(f) {
  try {
    return some(f());
  } catch (e) {
    return none;
  }
}

const PartialExceptionTypeId = /*#__PURE__*/Symbol();
exports.PartialExceptionTypeId = PartialExceptionTypeId;

class PartialException {
  constructor() {
    this._typeId = PartialExceptionTypeId;
  }

}

exports.PartialException = PartialException;

function raisePartial() {
  throw new PartialException();
}
/**
 * Simulates a partial function
 */


function partial(f) {
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
//# sourceMappingURL=core.js.map