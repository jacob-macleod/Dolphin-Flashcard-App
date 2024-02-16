import { makeAssociative } from "./makeAssociative.mjs";
/**
 * Boolean `Associative`  under conjunction
 */

export const all = /*#__PURE__*/makeAssociative((x, y) => x && y);
/**
 * Boolean `Associative` under disjunction
 */

export const any = /*#__PURE__*/makeAssociative((x, y) => x || y);
/**
 * Number `Associative` under addition
 */

export const sum = /*#__PURE__*/makeAssociative((x, y) => x + y);
/**
 * Number `Associative` under multiplication
 */

export const product = /*#__PURE__*/makeAssociative((x, y) => x * y);
/**
 * String `Associative` under concatenation
 */

export const string = /*#__PURE__*/makeAssociative((x, y) => x + y);
/**
 * Void `Associative`
 */

const void_ = /*#__PURE__*/makeAssociative(() => undefined);
export * from "./definition.mjs";
export { void_ as void };
//# sourceMappingURL=common.mjs.map