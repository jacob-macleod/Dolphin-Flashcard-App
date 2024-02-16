import * as E from "@effect-ts/system/Either";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as P from "../../Prelude/index.mjs";
import { forEachF } from "./forEachF.mjs";
/**
 * Separate `Either<E, Either<A, B>>` given `Identity<E>`
 */

export function separate(M) {
  const empty = E.left(M.identity);
  return ma => {
    return E.isLeft(ma) ? Tp.tuple(ma, ma) : E.isLeft(ma.right) ? Tp.tuple(E.right(ma.right.left), empty) : Tp.tuple(empty, E.right(ma.right.right));
  };
}
/**
 * Get `Wiltable`'s `separateF` given `Identity<E>`
 */

export function getSeparateF(M) {
  const sep = separate(M);
  return P.implementSeparateF()(_ => G => {
    const traverseF = forEachF(G);
    return f => x => G.map(sep)(traverseF(f)(x));
  });
}
/**
 * Get `Separate` instance given `Identity<E>`
 */

export function getSeparate(M) {
  const _separate = separate(M);

  return {
    separate: _separate
  };
}
//# sourceMappingURL=separate.mjs.map