// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import * as Tp from "../../Collections/Immutable/Tuple/index.mjs";
import { pipe } from "../../Function/index.mjs";
import * as P from "../../Prelude/index.mjs";
export const separateF = /*#__PURE__*/P.implementSeparateF()(_ => F => f => fa => {
  const o = O.map_(fa, a => F.map(e => Tp.tuple(O.getLeft(e), O.getRight(e)))(f(a)));
  return O.isNone(o) ? P.succeedF(F)(Tp.tuple(O.none, O.none)) : o.value;
});
//# sourceMappingURL=separateF.mjs.map