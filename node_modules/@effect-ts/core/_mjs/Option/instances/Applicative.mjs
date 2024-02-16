import * as P from "../../Prelude/index.mjs";
import { Covariant } from "./Covariant.mjs";
import { IdentityBoth } from "./IdentityBoth.mjs";
export const Applicative = { ...Covariant,
  ...IdentityBoth
};
//# sourceMappingURL=Applicative.mjs.map