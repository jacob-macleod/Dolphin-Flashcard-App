import * as A from "../Associative/index.mjs";
import { identity } from "../Function/index.mjs";
import { makeIdentity } from "./makeIdentity.mjs";
/**
 * Derive `Identity`
 */

export function deriveIdentity(D, I) {
  return D.derive(I);
}
/**
 * Fold `Identity` through an array
 */

export function fold(M) {
  const foldM = A.fold(M);
  return foldM(M.identity);
}
/**
 * The dual of a `Identity`, obtained by swapping the arguments of `concat`.
 */

export function inverted(M) {
  return makeIdentity(M.identity, A.inverted(M).combine);
}
/**
 * `Identity` for endomorphisms
 */

export function endomorphism() {
  return makeIdentity(identity, (x, y) => a => a);
}
/**
 * `Identity` for function combination
 */

export function func(M) {
  return () => makeIdentity(_ => M.identity, A.func(M)().combine);
}
/**
 * `Identity` that returns last `Max` of elements
 */

export function max(B) {
  return makeIdentity(B.bottom, A.max(B).combine);
}
/**
 * `Identity` that returns last `Min` of elements
 */

export function min(B) {
  return makeIdentity(B.top, A.min(B).combine);
}
/**
 * Given a struct of `Identity` returns a `Identity` for the struct
 */

export function struct(identities) {
  const empty = {};

  for (const key of Object.keys(identities)) {
    empty[key] = identities[key].identity;
  }

  return makeIdentity(empty, A.struct(identities).combine);
}
/**
 * Given a tuple of `Identity` returns a `Identity` for the tuple
 */

export function tuple(...identities) {
  return makeIdentity(identities.map(m => m.identity), A.tuple(...identities).combine);
}
//# sourceMappingURL=operations.mjs.map