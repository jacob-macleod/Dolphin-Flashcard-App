import * as A from "../Associative/common.js";
import type { Identity } from "./definition.js";
/**
 * Derive `Identity` from `Associative` and `identity`
 */
export declare function fromAssociative<A>(A: A.Associative<A>): (identity: A) => Identity<A>;
/**
 * Boolean `Identity` under conjunction
 */
export declare const all: Identity<boolean>;
/**
 * Boolean `Identity` under disjunction
 */
export declare const any: Identity<boolean>;
/**
 * Number `Identity` under multiplication
 */
export declare const product: Identity<number>;
/**
 * String `Identity` under concatenation
 */
export declare const string: Identity<string>;
/**
 * Number `Identity` under addition
 */
export declare const sum: Identity<number>;
/**
 * Void `Identity`
 */
declare const void_: Identity<void>;
export { void_ as void };
//# sourceMappingURL=common.d.ts.map