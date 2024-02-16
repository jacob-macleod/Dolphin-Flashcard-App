// ets_tracing: off
import "../Operator/index.mjs";
import * as T from "@effect-ts/system/Effect";
import * as I from "../Identity/index.mjs";
import * as DSL from "../Prelude/DSL/index.mjs";
import * as P from "../Prelude/index.mjs";
export * from "@effect-ts/system/Effect";
export { EffectURI } from "../Modules/index.mjs";
export const Any = {
  any: () => T.succeed({})
};
export const AssociativeEither = {
  orElseEither: T.orElseEither
};
export const AssociativeFlatten = {
  flatten: T.flatten
};
export const AssociativeBoth = {
  both: T.zip
};
export const Covariant = {
  map: T.map
};
export const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
export const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
export const Monad = { ...IdentityFlatten,
  ...Covariant
};
export const Applicative = { ...Covariant,
  ...IdentityBoth
};
export const Fail = {
  fail: T.fail
};
export const Run = {
  either: T.either
};
export const Access = {
  access: T.access
};
export const Provide = {
  provide: T.provideAll
};
export const getValidationApplicative = /*#__PURE__*/DSL.getValidationF({ ...Monad,
  ...Run,
  ...Fail,
  ...Applicative
});
export const Category = {
  id: T.environment,
  compose: T.compose
};
/**
 * Matchers
 */

export const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/DSL.matchers(Covariant);
/**
 * Derive sequential identity
 */

export function getIdentity(Id) {
  return () => I.makeIdentity(T.succeed(Id.identity), (x, y) => T.zipWith_(x, y, Id.combine));
}
/**
 * Derive parallel identity
 */

export function getIdentityPar(Id) {
  return () => I.makeIdentity(T.succeed(Id.identity), (x, y) => T.zipWithPar_(x, y, Id.combine));
}
//# sourceMappingURL=instances.mjs.map