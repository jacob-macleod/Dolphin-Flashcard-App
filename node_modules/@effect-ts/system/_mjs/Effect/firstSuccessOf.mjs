// ets_tracing: off
import * as A from "../Collections/Immutable/Array/index.mjs";
import * as NEA from "../Collections/Immutable/NonEmptyArray/index.mjs";
import { suspend } from "./core.mjs";
import { orElse_ } from "./orElse.mjs";
/**
 * Returns an effect that yields the value of the first
 * effect to succeed.
 */

export function firstSuccessOf(effects, __trace) {
  const first = NEA.head(effects);
  const rest = NEA.tail(effects);
  return suspend(() => A.reduce_(rest, first, (b, a) => orElse_(b, () => a)), __trace);
}
//# sourceMappingURL=firstSuccessOf.mjs.map