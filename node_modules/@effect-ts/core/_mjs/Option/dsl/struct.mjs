// ets_tracing: off
import * as P from "../../Prelude/index.mjs";
import { Applicative } from "../instances/Applicative.mjs";
import { Monad } from "../instances/Monad.mjs";
export const struct = /*#__PURE__*/P.structF({ ...Monad,
  ...Applicative
});
//# sourceMappingURL=struct.mjs.map