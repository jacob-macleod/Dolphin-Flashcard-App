// ets_tracing: off
import "../Operator/index.mjs";
/**
 * Async is a lightweight Effect data type that support as parameters:
 * - R: environment
 * - E: error
 * - A: output
 *
 * And additionally supports interruption
 */

import * as A from "@effect-ts/system/Async";
import * as E from "@effect-ts/system/Either";
import { NoSuchElementException } from "@effect-ts/system/GlobalExceptions";
import { identity, pipe } from "../Function/index.mjs";
import * as P from "../Prelude/index.mjs";
import { runEitherEnv } from "../Sync/index.mjs";
import { isEither, isOption, isTag } from "../Utils/index.mjs";
export { branch as if, branch_ as if_ };
export const Covariant = {
  map: A.map
};
export const Any = {
  any: () => A.succeed({})
};
export const AssociativeBoth = {
  both: A.zip
};
export const AssociativeFlatten = {
  flatten
};
export const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
export const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
export const Applicative = { ...Covariant,
  ...IdentityBoth
};
export const Monad = { ...Covariant,
  ...IdentityFlatten
};
export const Fail = {
  fail: A.fail
};
export const Run = {
  either: x => A.catchAll_(A.map_(x, E.right), e => A.succeed(E.left(e)))
};
export const either = Run.either;
export const getValidation = /*#__PURE__*/P.getValidationF({ ...Monad,
  ...Run,
  ...Applicative,
  ...Fail
});
export const Provide = {
  provide: A.provideAll
};
export const Access = {
  access: A.access
};

const genAdapter = (_, __) => {
  if (isTag(_)) {
    return new P.GenHKT(A.service(_));
  }

  if (isEither(_)) {
    return new P.GenHKT(_._tag === "Left" ? A.fail(_.left) : A.succeed(_.right));
  }

  if (isOption(_)) {
    return new P.GenHKT(_._tag === "None" ? A.fail(__ ? __() : new NoSuchElementException()) : A.succeed(_.value));
  }

  return new P.GenHKT(_);
};

export const gen = /*#__PURE__*/P.genF(Monad, {
  adapter: genAdapter
});
export function flatten(ffa) {
  return A.chain_(ffa, identity);
}
export function fromEither(_) {
  return _._tag === "Left" ? A.fail(_.left) : A.succeed(_.right);
}
export function fromSync(_) {
  return A.accessM(r => fromEither(runEitherEnv(r)(_)));
}
export const {
  match,
  matchIn,
  matchMorph,
  matchTag,
  matchTagIn
} = /*#__PURE__*/P.matchers(Covariant);
/**
 * Conditionals
 */

const branch = /*#__PURE__*/P.conditionalF(Covariant);
const branch_ = /*#__PURE__*/P.conditionalF_(Covariant);
export * from "@effect-ts/system/Async";
//# sourceMappingURL=index.mjs.map