import type { Generic, TypeOf } from "./newtype.js";
/**
 * A newtype representing addition.
 */
export declare const Sum: import("./newtype.js").GenericConstructor<"@newtype/Sum">;
export interface Sum<A> extends Generic<A, typeof Sum> {
}
/**
 * A newtype representing multiplication.
 */
export declare const Prod: import("./newtype.js").GenericConstructor<"@newtype/Prod">;
export interface Prod<A> extends Generic<A, typeof Prod> {
}
/**
 * A newtype representing logical disjunction.
 */
declare const Or_: import("./newtype.js").Constructor<boolean, "@newtype/Or">;
export interface Or extends TypeOf<typeof Or_> {
}
export declare const Or: import("./newtype.js").ConstructorK<boolean, "@newtype/Or", Or>;
/**
 * A newtype represeting logical conjunction.
 */
declare const And_: import("./newtype.js").Constructor<boolean, "@newtype/And">;
export interface And extends TypeOf<typeof And_> {
}
export declare const And: import("./newtype.js").ConstructorK<boolean, "@newtype/And", And>;
/**
 * A newtype representing parameterized logical disjunction.
 */
export declare const OrF: import("./newtype.js").GenericConstructor<"@newtype/OrF">;
export interface OrF<A> extends Generic<A, typeof OrF> {
}
/**
 * A newtype representing parameterized logical conjunction.
 */
export declare const AndF: import("./newtype.js").GenericConstructor<"@newtype/AndF">;
export interface AndF<A> extends Generic<A, typeof AndF> {
}
/**
 * A newtype representing taking the first of two elements.
 */
export declare const First: import("./newtype.js").GenericConstructor<"@newtype/First">;
export interface First<A> extends Generic<A, typeof First> {
}
/**
 * A newtype representing taking the last of two elements.
 */
export declare const Last: import("./newtype.js").GenericConstructor<"@newtype/Last">;
export interface Last<A> extends Generic<A, typeof Last> {
}
/**
 * A newtype representing taking the min of two elements.
 */
export declare const Min: import("./newtype.js").GenericConstructor<"@newtype/Min">;
export interface Min<A> extends Generic<A, typeof Min> {
}
/**
 * A newtype representing taking the max of two elements.
 */
export declare const Max: import("./newtype.js").GenericConstructor<"@newtype/Max">;
export interface Max<A> extends Generic<A, typeof Max> {
}
/**
 * A newtype representing another type in a failed state
 */
export declare const Failure: import("./newtype.js").GenericConstructor<"@newtype/Failure">;
export interface Failure<A> extends Generic<A, typeof Failure> {
}
/**
 * A newtype representing an input error in another type
 */
export declare const FailureIn: import("./newtype.js").GenericConstructor<"@newtype/FailureIn">;
export interface FailureIn<A> extends Generic<A, typeof FailureIn> {
}
/**
 * A newtype representing an output error in another type
 */
export declare const FailureOut: import("./newtype.js").GenericConstructor<"@newtype/FailureOut">;
export interface FailureOut<A> extends Generic<A, typeof FailureOut> {
}
/**
 * A newtype representing a Boolean Product
 */
export declare const BooleanProd: import("./newtype.js").Constructor<boolean, "@newtype/Prod">;
/**
 * A newtype representing a Boolean Sum
 */
export declare const BooleanSum: import("./newtype.js").Constructor<boolean, "@newtype/Sum">;
/**
 * A newtype representing a String Sum
 */
export declare const StringSum: import("./newtype.js").Constructor<string, "@newtype/Sum">;
export {};
//# sourceMappingURL=common.d.ts.map