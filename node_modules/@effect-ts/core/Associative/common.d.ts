import type { Associative } from "./makeAssociative.js";
/**
 * Boolean `Associative`  under conjunction
 */
export declare const all: Associative<boolean>;
/**
 * Boolean `Associative` under disjunction
 */
export declare const any: Associative<boolean>;
/**
 * Number `Associative` under addition
 */
export declare const sum: Associative<number>;
/**
 * Number `Associative` under multiplication
 */
export declare const product: Associative<number>;
/**
 * String `Associative` under concatenation
 */
export declare const string: Associative<string>;
/**
 * Void `Associative`
 */
declare const void_: Associative<void>;
export * from "./definition.js";
export { void_ as void };
//# sourceMappingURL=common.d.ts.map