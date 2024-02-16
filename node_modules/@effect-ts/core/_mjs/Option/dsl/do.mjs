// ets_tracing: off
import * as P from "../../Prelude/index.mjs";
import { Monad } from "../instances/Monad.mjs";
export const do_ = /*#__PURE__*/P.doF(Monad);
export const let_ = /*#__PURE__*/P.letF(Monad);
export { do_ as do, let_ as let };
export const bind = /*#__PURE__*/P.bindF(Monad);
//# sourceMappingURL=do.mjs.map