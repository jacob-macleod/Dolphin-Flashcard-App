// ets_tracing: off
import * as E from "@effect-ts/system/Either";
import { pipe } from "../../Function/index.mjs";
import * as DSL from "../../Prelude/DSL/index.mjs";
import * as P from "../../Prelude/index.mjs";
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => fa => E.isLeft(fa) ? DSL.succeedF(G)(fa) : G.map(E.right)(f(fa.right)));
//# sourceMappingURL=forEachF.mjs.map