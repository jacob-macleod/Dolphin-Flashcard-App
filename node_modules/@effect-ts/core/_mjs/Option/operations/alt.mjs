// ets_tracing: off
import * as P from "../../Prelude/index.mjs";
import { AssociativeEither } from "../instances/AssociativeEither.mjs";
import { Covariant } from "../instances/Covariant.mjs";
export const alt = /*#__PURE__*/P.orElseF({ ...Covariant,
  ...AssociativeEither
});
//# sourceMappingURL=alt.mjs.map