import { genericDef, newtype, typeDef } from "./newtype.mjs";
/**
 * A newtype representing addition.
 */

export const Sum = /*#__PURE__*/genericDef("@newtype/Sum");
/**
 * A newtype representing multiplication.
 */

export const Prod = /*#__PURE__*/genericDef("@newtype/Prod");
/**
 * A newtype representing logical disjunction.
 */

const Or_ = /*#__PURE__*/typeDef()("@newtype/Or");
export const Or = /*#__PURE__*/newtype()(Or_);
/**
 * A newtype represeting logical conjunction.
 */

const And_ = /*#__PURE__*/typeDef()("@newtype/And");
export const And = /*#__PURE__*/newtype()(And_);
/**
 * A newtype representing parameterized logical disjunction.
 */

export const OrF = /*#__PURE__*/genericDef("@newtype/OrF");
/**
 * A newtype representing parameterized logical conjunction.
 */

export const AndF = /*#__PURE__*/genericDef("@newtype/AndF");
/**
 * A newtype representing taking the first of two elements.
 */

export const First = /*#__PURE__*/genericDef("@newtype/First");
/**
 * A newtype representing taking the last of two elements.
 */

export const Last = /*#__PURE__*/genericDef("@newtype/Last");
/**
 * A newtype representing taking the min of two elements.
 */

export const Min = /*#__PURE__*/genericDef("@newtype/Min");
/**
 * A newtype representing taking the max of two elements.
 */

export const Max = /*#__PURE__*/genericDef("@newtype/Max");
/**
 * A newtype representing another type in a failed state
 */

export const Failure = /*#__PURE__*/genericDef("@newtype/Failure");
/**
 * A newtype representing an input error in another type
 */

export const FailureIn = /*#__PURE__*/genericDef("@newtype/FailureIn");
/**
 * A newtype representing an output error in another type
 */

export const FailureOut = /*#__PURE__*/genericDef("@newtype/FailureOut");
/**
 * A newtype representing a Boolean Product
 */

export const BooleanProd = /*#__PURE__*/Prod.of();
/**
 * A newtype representing a Boolean Sum
 */

export const BooleanSum = /*#__PURE__*/Sum.of();
/**
 * A newtype representing a String Sum
 */

export const StringSum = /*#__PURE__*/Sum.of();
//# sourceMappingURL=common.mjs.map