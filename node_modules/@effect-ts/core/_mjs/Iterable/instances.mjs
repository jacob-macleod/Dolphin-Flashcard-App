import * as P from "../Prelude/index.mjs";
import * as It from "./operations.mjs";
export const Any = {
  any: () => It.of(undefined)
};
export const None = {
  never: () => It.never
};
export const Covariant = {
  map: It.map
};
export const AssociativeBoth = {
  both: It.zip
};
export const AssociativeFlatten = {
  flatten: It.flatten
};
export const Applicative = { ...Any,
  ...Covariant,
  ...AssociativeBoth
};
export const Monad = { ...Any,
  ...Covariant,
  ...AssociativeFlatten
};
export const ForEach = { ...Covariant,
  forEachF: It.forEachF
};
//# sourceMappingURL=instances.mjs.map