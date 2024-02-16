"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sum = exports.StringSum = exports.Prod = exports.OrF = exports.Or = exports.Min = exports.Max = exports.Last = exports.First = exports.FailureOut = exports.FailureIn = exports.Failure = exports.BooleanSum = exports.BooleanProd = exports.AndF = exports.And = void 0;

var _newtype = /*#__PURE__*/require("./newtype.js");

/**
 * A newtype representing addition.
 */
const Sum = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/Sum");
/**
 * A newtype representing multiplication.
 */

exports.Sum = Sum;
const Prod = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/Prod");
/**
 * A newtype representing logical disjunction.
 */

exports.Prod = Prod;
const Or_ = /*#__PURE__*/(0, _newtype.typeDef)()("@newtype/Or");
const Or = /*#__PURE__*/(0, _newtype.newtype)()(Or_);
/**
 * A newtype represeting logical conjunction.
 */

exports.Or = Or;
const And_ = /*#__PURE__*/(0, _newtype.typeDef)()("@newtype/And");
const And = /*#__PURE__*/(0, _newtype.newtype)()(And_);
/**
 * A newtype representing parameterized logical disjunction.
 */

exports.And = And;
const OrF = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/OrF");
/**
 * A newtype representing parameterized logical conjunction.
 */

exports.OrF = OrF;
const AndF = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/AndF");
/**
 * A newtype representing taking the first of two elements.
 */

exports.AndF = AndF;
const First = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/First");
/**
 * A newtype representing taking the last of two elements.
 */

exports.First = First;
const Last = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/Last");
/**
 * A newtype representing taking the min of two elements.
 */

exports.Last = Last;
const Min = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/Min");
/**
 * A newtype representing taking the max of two elements.
 */

exports.Min = Min;
const Max = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/Max");
/**
 * A newtype representing another type in a failed state
 */

exports.Max = Max;
const Failure = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/Failure");
/**
 * A newtype representing an input error in another type
 */

exports.Failure = Failure;
const FailureIn = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/FailureIn");
/**
 * A newtype representing an output error in another type
 */

exports.FailureIn = FailureIn;
const FailureOut = /*#__PURE__*/(0, _newtype.genericDef)("@newtype/FailureOut");
/**
 * A newtype representing a Boolean Product
 */

exports.FailureOut = FailureOut;
const BooleanProd = /*#__PURE__*/Prod.of();
/**
 * A newtype representing a Boolean Sum
 */

exports.BooleanProd = BooleanProd;
const BooleanSum = /*#__PURE__*/Sum.of();
/**
 * A newtype representing a String Sum
 */

exports.BooleanSum = BooleanSum;
const StringSum = /*#__PURE__*/Sum.of();
exports.StringSum = StringSum;
//# sourceMappingURL=common.js.map