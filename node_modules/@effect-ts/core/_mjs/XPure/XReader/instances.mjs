// ets_tracing: off
import * as F from "@effect-ts/system/XPure";
import * as P from "../../Prelude/index.mjs";
import { map, zip } from "./operations.mjs";
/**
 * The `Access` instance for `Reader[-_, +_]`.
 */

export const Access = {
  access: F.access
};
/**
 * The `Any` instance for `Reader[-_, +_]`.
 */

export const Any = {
  any: () => F.succeed(() => ({}))
};
/**
 * The `Covariant` instance for `Reader[-_, +_]`.
 */

export const Covariant = {
  map
};
/**
 * The `AssociativeBoth` instance for `Reader[-_, +_]`.
 */

export const AssociativeBoth = {
  both: zip
};
/**
 * The `AssociativeFlatten` instance for `Reader[-_, +_]`.
 */

export const AssociativeFlatten = {
  flatten: ffa => F.chain_(ffa, x => x)
};
/**
 * The `IdentityFlatten` instance for `Reader[-_, +_]`.
 */

export const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
/**
 * The `Monad` instance for `Reader[-_, +_]`.
 */

export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
/**
 * The `Applicative` instance for `Reader[-_, +_]`.
 */

export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
//# sourceMappingURL=instances.mjs.map