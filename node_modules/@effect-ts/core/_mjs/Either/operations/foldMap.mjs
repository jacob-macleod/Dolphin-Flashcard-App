import * as E from "@effect-ts/system/Either";
/**
 * Fold `Identity` through `Either`
 */

export const foldMap_ = M => (fa, f) => E.isLeft(fa) ? M.identity : f(fa.right);
/**
 * Fold `Identity` through `Either`
 */

export const foldMap = M => f => fa => foldMap_(M)(fa, f);
//# sourceMappingURL=foldMap.mjs.map