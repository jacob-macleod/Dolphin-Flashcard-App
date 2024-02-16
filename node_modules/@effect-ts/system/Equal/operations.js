"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.any = void 0;
exports.array = array;
exports.boolean = void 0;
exports.both = both;
exports.contramap = contramap;
exports.date = void 0;
exports.makeEqual = makeEqual;
exports.number = exports.never = void 0;
exports.orElseEither = orElseEither;
exports.strict = strict;
exports.string = void 0;
exports.struct = struct;
exports.symbol = void 0;
exports.tuple = tuple;

/**
 * Constructs an `Equal[A]` from a function. The instance will be optimized
 * to first compare the values for reference equality and then compare the
 * values for value equality.
 */
function makeEqual(f) {
  return {
    equals: f
  };
}
/**
 * Equality for `Any` values. Note that since values of type `Any` contain
 * no information, all values of type `Any` can be treated as equal to each
 * other.
 */


const any = /*#__PURE__*/makeEqual(() => true);
/**
 * Equality for `Nothing` values. Note that since there are not values of
 * type `Nothing` the `equals` method of this instance can never be called
 * but it can be useful in deriving instances for more complex types.
 */

exports.any = any;
const never = /*#__PURE__*/makeEqual(() => false);
/**
 * Constructs an `Equal[(A, B)]` given an `Equal[A]` and `Equal[B]` by first
 * comparing the `A` values for equality and then comparing the `B` values
 * for equality, if necessary.
 */

exports.never = never;

function both(fb) {
  return fa => makeEqual(({
    tuple: [x0, x1]
  }, {
    tuple: [y0, y1]
  }) => fa.equals(x0, y0) && fb.equals(x1, y1));
}
/**
 * Constructs an `Equal[Either[A, B]]` given an `Equal[A]` and an
 * `Equal[B]`. The instance will compare the `Either[A, B]` values and if
 * both are `Right` or `Left` compare them for equality.
 */


function orElseEither(fb) {
  return fa => makeEqual((ex, ey) => ex._tag === "Left" && ey._tag === "Left" ? fa.equals(ex.left, ey.left) : ex._tag === "Right" && ey._tag === "Right" ? fb().equals(ex.right, ey.right) : false);
}
/**
 * Constructs an `Equal[B]` given an `Equal[A]` and a function `f` to
 * transform a `B` value into an `A` value. The instance will convert each
 * `B` value into an `A` and the compare the `A` values for equality.
 */


function contramap(f) {
  return fa => makeEqual((x, y) => fa.equals(f(x), f(y)));
}
/**
 * Constructs an `Equal[A]` that uses the default notion of equality
 * embodied in the implementation of `equals` for values of type `A`.
 */


function strict() {
  return makeEqual((x, y) => x === y);
}
/**
 * Equality for `number` values.
 */


const number = /*#__PURE__*/strict();
/**
 * Equality for `string` values.
 */

exports.number = number;
const string = /*#__PURE__*/strict();
/**
 * Equality for `symbol` values.
 */

exports.string = string;
const symbol = /*#__PURE__*/strict();
/**
 * Equality for `boolean` values.
 */

exports.symbol = symbol;
const boolean = /*#__PURE__*/strict();
/**
 * Equality for `Date` values.
 */

exports.boolean = boolean;
const date = /*#__PURE__*/contramap(date => date.valueOf())(number);
/**
 * Derives an `Equal[Array[A]]` given an `Equal[A]`.
 */

exports.date = date;

function array(EqA) {
  return {
    equals: (x, y) => {
      if (x.length === y.length) {
        for (let i = 0; i < x.length; i++) {
          if (!EqA.equals(x[i], y[i])) {
            return false;
          }
        }

        return true;
      }

      return false;
    }
  };
}
/**
 * Given a tuple of `Equal`s returns a `Equal` for the tuple
 */


function tuple(...eqs) {
  return makeEqual((x, y) => eqs.every((E, i) => E.equals(x.get(i), y.get(i))));
}
/**
 * Given a struct of `Equal`s returns a `Equal` for the struct
 */


function struct(eqs) {
  return makeEqual((x, y) => {
    for (const k in eqs) {
      if (!eqs[k].equals(x[k], y[k])) {
        return false;
      }
    }

    return true;
  });
}
//# sourceMappingURL=operations.js.map