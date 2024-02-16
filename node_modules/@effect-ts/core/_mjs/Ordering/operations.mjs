import * as A from "../Associative/makeAssociative.mjs";
import * as I from "../Identity/makeIdentity.mjs";
/**
 * `Associative` instance for `Ordering`
 */

export const Associative = /*#__PURE__*/A.makeAssociative((x, y) => x !== 0 ? x : y);
/**
 * `Identity` instance for `Ordering`
 */

export const Identity = /*#__PURE__*/I.makeIdentity(0, Associative.combine);
//# sourceMappingURL=operations.mjs.map