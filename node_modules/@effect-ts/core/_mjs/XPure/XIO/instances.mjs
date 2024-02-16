// ets_tracing: off
import * as F from "@effect-ts/system/XPure";
import * as P from "../../Prelude/index.mjs";
import { map, zip } from "./operations.mjs";
/**
 * The `Any` instance for `IO[+_]`.
 */

export const Any = {
  any: () => F.succeed(() => ({}))
};
/**
 * The `Covariant` instance for `IO[+_]`.
 */

export const Covariant = {
  map
};
/**
 * The `AssociativeBoth` instance for `IO[+_]`.
 */

export const AssociativeBoth = {
  both: zip
};
/**
 * The `AssociativeFlatten` instance for `IO[+_]`.
 */

export const AssociativeFlatten = {
  flatten: ffa => F.chain_(ffa, x => x)
};
/**
 * The `IdentityFlatten` instance for `IO[+_]`.
 */

export const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
/**
 * The `Monad` instance for `IO[+_]`.
 */

export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
/**
 * The `Applicative` instance for `IO[+_]`.
 */

export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
//# sourceMappingURL=instances.mjs.map