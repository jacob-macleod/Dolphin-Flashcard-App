// ets_tracing: off
import * as T from "@effect-ts/system/Effect";
import * as L from "@effect-ts/system/Layer";
import * as P from "../../Prelude/index.mjs";
export const AssociativeBoth = {
  both: L.zip
};
export const Any = {
  any: () => L.fromRawEffect(T.succeed({}))
};
export const Covariant = {
  map: L.map
};
export const IdentityBoth = { ...Any,
  ...AssociativeBoth
};
export const Applicative = { ...Covariant,
  ...IdentityBoth
};
export const AssociativeFlatten = {
  flatten: L.flatten
};
export const IdentityFlatten = { ...Any,
  ...AssociativeFlatten
};
export const Monad = { ...Covariant,
  ...IdentityFlatten
};
//# sourceMappingURL=instances.mjs.map