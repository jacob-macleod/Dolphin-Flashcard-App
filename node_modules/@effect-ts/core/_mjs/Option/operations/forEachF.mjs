// ets_tracing: off
import * as O from "@effect-ts/system/Option";
import { pipe } from "../../Function/index.mjs";
import * as P from "../../Prelude/index.mjs";
export const forEachF = /*#__PURE__*/P.implementForEachF()(() => G => f => fa => O.isNone(fa) ? P.succeedF(G)(O.none) : G.map(O.some)(f(fa.value)));
//# sourceMappingURL=forEachF.mjs.map