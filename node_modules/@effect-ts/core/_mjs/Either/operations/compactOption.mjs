import * as E from "@effect-ts/system/Either";
import { pipe } from "../../Function/index.mjs";
import * as P from "../../Prelude/index.mjs";
import { forEachF } from "./forEachF.mjs";
/**
 * Compact `Either<E, Option<A>>` given `Identity<E>`
 */

export function compactOption(M) {
  return ma => {
    return E.isLeft(ma) ? ma : ma.right._tag === "None" ? E.left(M.identity) : E.right(ma.right.value);
  };
}
/**
 * Get `Witherable`'s `compactF` given `Identity<E>`
 */

export function getCompactF(M) {
  const com = compactOption(M);
  return P.implementCompactF()(_ => G => {
    const traverseF = forEachF(G);
    return f => x => G.map(com)(traverseF(f)(x));
  });
}
/**
 * Get `Compact` instance given `Identity<E>`
 */

export function getCompact(M) {
  const _compact = compactOption(M);

  return {
    compact: _compact
  };
}
//# sourceMappingURL=compactOption.mjs.map