// ets_tracing: off
import { constant, identity } from "@effect-ts/system/Function";
import * as X from "@effect-ts/system/Sync";
import * as P from "../../Prelude/index.mjs";
export const Any = {
  any: () => X.succeed(constant({}))
};
export const Covariant = {
  map: X.map
};
export const AssociativeBoth = {
  both: X.zip
};
export const AssociativeEither = {
  orElseEither: X.orElseEither
};
export const AssociativeFlatten = {
  flatten: ffa => X.chain_(ffa, identity)
};
export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
export const Access = {
  access: X.access
};
export const Fail = {
  fail: X.fail
};
export const Run = {
  either: X.either
};
export const Provide = {
  provide: X.provideAll
};
export const Monad = { ...Any,
  ...AssociativeFlatten,
  ...Covariant
};
//# sourceMappingURL=instances.mjs.map