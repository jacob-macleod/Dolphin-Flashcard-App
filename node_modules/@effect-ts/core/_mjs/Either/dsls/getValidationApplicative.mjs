// ets_tracing: off
import * as DSL from "../../Prelude/DSL/index.mjs";
import { Applicative, Fail, Monad, Run } from "../instances.mjs";
export const getValidationApplicative = /*#__PURE__*/DSL.getValidationF({ ...Monad,
  ...Fail,
  ...Applicative,
  ...Run
});
//# sourceMappingURL=getValidationApplicative.mjs.map