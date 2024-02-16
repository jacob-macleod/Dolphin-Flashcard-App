// ets_tracing: off
import { pipe } from "@effect-ts/system/Function";
import * as I from "@effect-ts/system/Iterable";
import { succeedF } from "../Prelude/DSL/index.mjs";
import * as P from "../Prelude/index.mjs";
export * from "@effect-ts/system/Iterable";
/**
 * `ForEach`'s `forEachF` function
 */

export const forEachF = /*#__PURE__*/P.implementForEachF()(_ => G => f => I.reduce(succeedF(G)(I.never), (b, a) => G.map(({
  tuple: [x, y]
}) => I.concat(x, I.of(y)))(G.both(f(a))(b))));
//# sourceMappingURL=operations.mjs.map