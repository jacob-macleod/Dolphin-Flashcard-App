// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import * as P from "../../Prelude/index.mjs";
export const compactF = /*#__PURE__*/P.implementCompactF()(_ => F => f => fa => {
  return O.isNone(fa) ? P.succeedF(F)(O.none) : f(fa.value);
});
//# sourceMappingURL=compactF.mjs.map