// ets_tracing: off
import * as A from "../Associative/common.mjs";
import { makeIdentity } from "./makeIdentity.mjs";
/**
 * Derive `Identity` from `Associative` and `identity`
 */

export function fromAssociative(A) {
  return identity => makeIdentity(identity, A.combine);
}
/**
 * Boolean `Identity` under conjunction
 */

export const all = /*#__PURE__*/makeIdentity(true, A.all.combine);
/**
 * Boolean `Identity` under disjunction
 */

export const any = /*#__PURE__*/fromAssociative(A.any)(false);
/**
 * Number `Identity` under multiplication
 */

export const product = /*#__PURE__*/fromAssociative(A.product)(1);
/**
 * String `Identity` under concatenation
 */

export const string = /*#__PURE__*/fromAssociative(A.string)("");
/**
 * Number `Identity` under addition
 */

export const sum = /*#__PURE__*/fromAssociative(A.sum)(0);
/**
 * Void `Identity`
 */

const void_ = /*#__PURE__*/fromAssociative(A.void)(undefined);
export { void_ as void };
//# sourceMappingURL=common.mjs.map