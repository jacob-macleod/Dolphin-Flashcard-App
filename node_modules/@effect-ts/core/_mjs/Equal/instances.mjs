// ets_tracing: off
import * as Equal from "@effect-ts/system/Equal";
import * as P from "../Prelude/index.mjs";
/**
 * The `AssociativeBoth` instance for `Equal`.
 */

export const AssociativeBoth = {
  both: Equal.both
};
/**
 * The `AssociativeEither` instance for `Equal`.
 */

export const AssociativeEither = {
  orElseEither: Equal.orElseEither
};
/**
 * The `Contravariant` instance for `Equal`.
 */

export const Contravariant = {
  contramap: Equal.contramap
};
/**
 * The `Any` instance for `Equal`.
 */

export const Any = {
  any: () => Equal.any
};
/**
 * The `IdentityBoth` instance for `Equal`.
 */

export const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
/**
 * The `None` instance for `Equal`.
 */

export const None = {
  never: () => Equal.never
};
/**
 * The `IdentityEither` instance for `Equal`.
 */

export const IdentityEither = { ...None,
  ...AssociativeEither
};
//# sourceMappingURL=instances.mjs.map