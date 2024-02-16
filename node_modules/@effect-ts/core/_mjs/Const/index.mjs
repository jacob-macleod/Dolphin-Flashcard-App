// ets_tracing: off
import "../Operator/index.mjs";
import { unsafeCoerce } from "../Function/index.mjs";
import * as P from "../Prelude/index.mjs";
import { makeShow } from "../Show/index.mjs";
/**
 * Map + MapLeft
 */

export function bimap_(fea, f, g) {
  return makeConst(f(fea))();
}
/**
 * Map + MapLeft
 */

export function bimap(f, g) {
  return fa => bimap_(fa, f, g);
}
/**
 * Contramap input
 */

export const contramap_ = unsafeCoerce;
/**
 * Contramap input
 */

export function contramap(f) {
  return fa => contramap_(fa, f);
}
/**
 * The `Any` instance for `Const[E, +_]`
 */

export function getAny(e) {
  return {
    any: makeConst(e)
  };
}
/**
 * The `AssociativeBoth` instance for `Const[E, +_]`
 */

export function getAssociativeBoth(A) {
  return {
    both: fb => fa => makeConst(A.combine(fa, fb))()
  };
}
/**
 * The `Contravariant` instance for `Const[+_, +_]`
 */

export const Contravariant = {
  contramap
};
/**
 * The `Covariant` instance for `Const[E, +_]`
 */

export const Covariant = {
  map
};
/**
 * The `IdentityBoth` instance for `Const[E, +_]`
 */

export function getIdentityBoth(I) {
  return { ...getAny(I.identity),
    ...getAssociativeBoth(I)
  };
}
/**
 * The `Applicative` instance for `Const[E, +_]`
 */

export function getApplicative(I) {
  return { ...Covariant,
    ...getIdentityBoth(I)
  };
}
/**
 * The `Show` instance for `Const[E, +_]`
 */

export function getShow(S) {
  return () => makeShow(c => `make(${S.show(c)})`);
}
/**
 * The `Bounded` instance for `Const[E, +_]`
 */

export function getBounded(B) {
  return () => B;
}
/**
 * The `Equal` instance for `Const[E, +_]`
 */

export function getEqual(E) {
  return () => E;
}
/**
 * The `Identity` instance for `Const[E, +_]`
 */

export function getIdentity(I) {
  return () => I;
}
/**
 * The `Ord` instance for `Const[E, +_]`
 */

export function getOrd(O) {
  return () => O;
}
/**
 * The `Associative` instance for `Const[E, +_]`
 */

export function getAssociative(A) {
  return () => A;
}
/**
 * Construct `Const[E, A]`
 */

export const makeConst = e => () => e;
/**
 * Maps `Const[E, A]` to `Const[E, B]` via `f : A => B`
 *
 * @ets_optimize identity
 */

export const map_ = unsafeCoerce;
/**
 * Maps `Const[E, A]` to `Const[E, B]` via `f : A => B`
 */

export function map(f) {
  return fa => map_(fa, f);
}
/**
 * Maps `Const[E, A]` to `Const[E1, A]` via `f : E => E1`
 */

export const mapLeft_ = (fea, f) => makeConst(f(fea))();
/**
 * Maps `Const[E, A]` to `Const[E1, A]` via `f : E => E1`
 */

export function mapLeft(f) {
  return fa => mapLeft_(fa, f);
}
//# sourceMappingURL=index.mjs.map