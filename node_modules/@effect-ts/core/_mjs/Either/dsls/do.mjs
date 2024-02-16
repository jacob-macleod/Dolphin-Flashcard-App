// ets_tracing: off
import * as DSL from "../../Prelude/DSL/index.mjs";
import { Monad } from "../instances.mjs";
const do_ = /*#__PURE__*/DSL.doF(Monad);
const let_ = /*#__PURE__*/DSL.bindF(Monad);
export { do_ as do, let_ as let };
export const bind = /*#__PURE__*/DSL.bindF(Monad);
//# sourceMappingURL=do.mjs.map