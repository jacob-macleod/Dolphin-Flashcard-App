// ets_tracing: off
import * as P from "../../Prelude/index.mjs";
import { Applicative } from "../instances/Applicative.mjs";
import { Monad } from "../instances/Monad.mjs";
export const tuple = /*#__PURE__*/P.tupleF({ ...Monad,
  ...Applicative
});
//# sourceMappingURL=tuple.mjs.map