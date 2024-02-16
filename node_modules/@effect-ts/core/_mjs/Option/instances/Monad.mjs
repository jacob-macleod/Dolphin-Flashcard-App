import * as P from "../../Prelude/index.mjs";
import { Covariant } from "./Covariant.mjs";
import { IdentityFlatten } from "./IdentityFlatten.mjs";
export const Monad = { ...Covariant,
  ...IdentityFlatten
};
//# sourceMappingURL=Monad.mjs.map