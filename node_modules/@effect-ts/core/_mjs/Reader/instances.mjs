import * as P from "../Prelude/index.mjs";
import { access, map, zip } from "./operations.mjs";
/**
 * The `Access` instance for `Reader[-_, +_]`.
 */

export const Access = {
  access
};
/**
 * The `Any` instance for `Reader[-_, +_]`.
 */

export const Any = {
  any: () => () => ({})
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
  flatten: ffa => r => ffa(r)(r)
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